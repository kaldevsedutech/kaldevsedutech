import crypto from 'node:crypto';
import dns from 'node:dns';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Razorpay from 'razorpay';
import { z } from 'zod';

dotenv.config();
dns.setServers(['8.8.8.8', '8.8.4.4']);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 5000);
const jwtSecret = process.env.JWT_SECRET || 'local_dev_secret';

app.use(cors({ origin: true }));
app.use(express.json({ limit: '1mb' }));

let databaseReady = false;
const memoryStore = {
  inquiries: [],
  payments: [],
  products: []
};

const inquirySchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    organization: String,
    type: String,
    technology: String,
    message: String,
    source: String
  },
  { timestamps: true }
);

const paymentSchema = new mongoose.Schema(
  {
    workshopTitle: String,
    amount: Number,
    currency: String,
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    status: String
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: String,
    tag: String,
    status: String,
    text: String
  },
  { timestamps: true }
);

const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);
const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const inquiryInput = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(160),
  phone: z.string().max(30).optional().default(''),
  organization: z.string().max(160).optional().default(''),
  type: z.string().max(80).optional().default('General'),
  technology: z.string().max(120).optional().default(''),
  message: z.string().min(5).max(3000),
  source: z.string().max(80).optional().default('Website')
});

const productInput = z.object({
  name: z.string().min(2).max(120),
  tag: z.string().min(2).max(160),
  status: z.string().min(2).max(80).default('In Development'),
  text: z.string().min(5).max(1000)
});

const razorpay =
  process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
    ? new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
      })
    : null;

async function connectDatabase() {
  if (!process.env.MONGODB_URI) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 2500,
      connectTimeoutMS: 2500,
      socketTimeoutMS: 2500
    });
    databaseReady = true;
    console.log('MongoDB connected');
  } catch (error) {
    databaseReady = false;
    console.warn('MongoDB not connected. Using in-memory fallback:', error.message);
  }
}

function requireAdmin(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Missing admin token' });
  }

  try {
    req.admin = jwt.verify(token, jwtSecret);
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid admin token' });
  }
}

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    database: databaseReady ? 'mongodb' : 'memory',
    razorpay: Boolean(razorpay)
  });
});

app.post('/api/inquiries', async (req, res) => {
  const parsed = inquiryInput.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Please check the form fields.', errors: parsed.error.flatten() });
  }

  const payload = parsed.data;
  const saved = databaseReady ? await Inquiry.create(payload) : { _id: crypto.randomUUID(), ...payload, createdAt: new Date() };

  if (!databaseReady) {
    memoryStore.inquiries.unshift(saved);
  }

  return res.status(201).json({ message: 'Inquiry submitted successfully.', inquiryId: saved._id });
});

app.get('/api/products', async (req, res) => {
  const products = databaseReady ? await Product.find().sort({ createdAt: -1 }).lean() : memoryStore.products;
  return res.json({ products });
});

app.post('/api/payments/create-order', async (req, res) => {
  if (!razorpay) {
    return res.status(500).json({ message: 'Razorpay is not configured.' });
  }

  const workshopTitle = String(req.body.workshopTitle || 'Workshop Registration');
  const amount = Number(req.body.amount || 9);

  if (!Number.isFinite(amount) || amount < 1) {
    return res.status(400).json({ message: 'Invalid payment amount.' });
  }

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: 'INR',
    receipt: `kaldevs_${Date.now()}`,
    notes: { workshopTitle }
  });

  return res.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: process.env.RAZORPAY_KEY_ID
  });
});

app.post('/api/payments/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, workshopTitle, amount } = req.body;
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '').update(body).digest('hex');

  if (expected !== razorpay_signature) {
    return res.status(400).json({ message: 'Payment verification failed.' });
  }

  const payload = {
    workshopTitle,
    amount,
    currency: 'INR',
    razorpayOrderId: razorpay_order_id,
    razorpayPaymentId: razorpay_payment_id,
    razorpaySignature: razorpay_signature,
    status: 'verified'
  };

  const saved = databaseReady ? await Payment.create(payload) : { _id: crypto.randomUUID(), ...payload, createdAt: new Date() };
  if (!databaseReady) {
    memoryStore.payments.unshift(saved);
  }

  return res.json({ message: 'Payment verified successfully.', paymentId: saved._id });
});

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const emailMatches = email === adminEmail;
  const passwordMatches = adminPassword?.startsWith('$2')
    ? await bcrypt.compare(password || '', adminPassword)
    : password === adminPassword;

  if (!emailMatches || !passwordMatches) {
    return res.status(401).json({ message: 'Invalid admin login.' });
  }

  const token = jwt.sign({ email, role: 'admin' }, jwtSecret, { expiresIn: '8h' });
  return res.json({ token });
});

app.get('/api/admin/inquiries', requireAdmin, async (req, res) => {
  const inquiries = databaseReady ? await Inquiry.find().sort({ createdAt: -1 }).limit(100).lean() : memoryStore.inquiries;
  return res.json({ inquiries });
});

app.get('/api/admin/payments', requireAdmin, async (req, res) => {
  const payments = databaseReady ? await Payment.find().sort({ createdAt: -1 }).limit(100).lean() : memoryStore.payments;
  return res.json({ payments });
});

app.get('/api/admin/products', requireAdmin, async (req, res) => {
  const products = databaseReady ? await Product.find().sort({ createdAt: -1 }).limit(100).lean() : memoryStore.products;
  return res.json({ products });
});

app.post('/api/admin/products', requireAdmin, async (req, res) => {
  const parsed = productInput.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Please check product fields.', errors: parsed.error.flatten() });
  }

  const saved = databaseReady
    ? await Product.create(parsed.data)
    : { _id: crypto.randomUUID(), ...parsed.data, createdAt: new Date() };

  if (!databaseReady) {
    memoryStore.products.unshift(saved);
  }

  return res.status(201).json({ message: 'Product added successfully.', product: saved });
});

app.delete('/api/admin/products/:id', requireAdmin, async (req, res) => {
  if (databaseReady) {
    await Product.findByIdAndDelete(req.params.id);
  } else {
    memoryStore.products = memoryStore.products.filter((product) => product._id !== req.params.id);
  }

  return res.json({ message: 'Product removed successfully.' });
});

const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`KalDevsEduTech server running on http://127.0.0.1:${port}`);
});

connectDatabase();
