import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardCheck,
  Cloud,
  Code2,
  Cpu,
  Database,
  FileText,
  GraduationCap,
  Handshake,
  Headphones,
  Lightbulb,
  LineChart,
  Menu,
  MessageCircle,
  Microscope,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  X
} from 'lucide-react';
import './styles.css';

const navItems = [
  ['Home', '/'],
  ['Services', '/services'],
  ['Products', '/products'],
  ['Career Hub', '/career-hub'],
  ['Innovation', '/innovation'],
  ['Workshops', '/workshops'],
  ['Support', '/support'],
  ['Contact', '/contact']
];

const policyItems = [
  ['Privacy Policy', '/privacy-policy'],
  ['Terms & Conditions', '/terms-and-conditions'],
  ['Refund Policy', '/refund-policy'],
  ['Shipping & Delivery', '/shipping-delivery-policy']
];

const stats = [
  ['100+', 'Solution Concepts'],
  ['50+', 'Technology Areas'],
  ['20+', 'Service Lines'],
  ['Future Ready', 'Innovation Platform']
];

const services = [
  {
    icon: Code2,
    title: 'Software Engineering',
    text: 'Custom software, enterprise apps, APIs, microservices, web platforms, and scalable application architecture.'
  },
  {
    icon: BrainCircuit,
    title: 'AI & Machine Learning',
    text: 'Generative AI, computer vision, NLP, predictive analytics, AI agents, recommendation systems, and intelligent automation.'
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    text: 'Cloud-ready solutions, deployment pipelines, automation, infrastructure planning, monitoring, and performance optimization.'
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity & Reliability',
    text: 'Security-first architecture, validation, access control planning, secure APIs, logging, and operational resilience.'
  },
  {
    icon: Cpu,
    title: 'IoT & Smart Systems',
    text: 'Connected devices, smart city concepts, agriculture technology, industrial automation, and edge-enabled solutions.'
  },
  {
    icon: LineChart,
    title: 'Digital Transformation',
    text: 'Workflow automation, CRM/ERP planning, analytics dashboards, business intelligence, and process modernization.'
  }
];

const products = [
  {
    icon: Users,
    name: 'KalDevsEduTech Career Hub',
    tag: 'AI Career & Opportunity Platform',
    status: 'In Development',
    text: 'Career profiles, job discovery, internship opportunities, resume support, AI guidance, and professional growth tools.'
  },
  {
    icon: Bot,
    name: 'KalDev AI',
    tag: 'AI Assistant Platform',
    status: 'In Development',
    text: 'AI assistants, workflow automation, intelligence layers, and productivity tools for teams and businesses.'
  },
  {
    icon: MessageCircle,
    name: 'WAPIMI',
    tag: 'WhatsApp Powered Marketing Intelligence',
    status: 'Available',
    text: 'WhatsApp-based marketing intelligence and automation for lead engagement, campaigns, and customer conversations.',
    link: '/wapimi',
    action: 'Open WAPIMI'
  },
  {
    icon: Building2,
    name: 'KalDev CRM',
    tag: 'Business Relationship Platform',
    status: 'In Development',
    text: 'Lead tracking, customer records, follow-ups, pipelines, service history, and performance visibility.'
  },
  {
    icon: Database,
    name: 'KalDev ERP',
    tag: 'Enterprise Operations Platform',
    status: 'In Development',
    text: 'Business operations, HR, inventory, finance workflows, teams, approvals, and internal process control.'
  },
  {
    icon: BarChart3,
    name: 'KalDev Analytics',
    tag: 'BI Dashboard',
    status: 'In Development',
    text: 'Data visualization, performance reports, KPI dashboards, business intelligence, and decision support.'
  },
  {
    icon: Microscope,
    name: 'KalDev Research',
    tag: 'R&D Management',
    status: 'In Development',
    text: 'Research management, innovation tracking, patent workflows, prototypes, and publication support.'
  },
  {
    icon: Lightbulb,
    name: 'KalDev Projects',
    tag: 'Innovation Project Support',
    status: 'In Development',
    text: 'Real-world problem statements, prototypes, technical documentation, academic innovation, and build guidance.'
  },
];

const careerHubFeatures = [
  'AI-powered job and internship discovery',
  'Resume building and ATS review support',
  'Profile improvement recommendations',
  'Interview preparation and mock interview planning',
  'Career roadmaps by technology track',
  'Application tracking and opportunity management'
];

const industries = [
  'Healthcare',
  'Agriculture',
  'Banking & Finance',
  'Retail & E-commerce',
  'Manufacturing',
  'Government',
  'Logistics',
  'Energy',
  'Real Estate',
  'Telecommunications'
];

const supportChannels = [
  {
    icon: Headphones,
    title: 'Product Support',
    text: 'Support for KalDev AI, WAPIMI, CRM, ERP, Analytics, Research, Projects, and admin-managed future AI tools.'
  },
  {
    icon: Handshake,
    title: 'Business Support',
    text: 'Custom software, automation, dashboards, AI integration, consulting, and digital transformation inquiries.'
  },
  {
    icon: Microscope,
    title: 'Research Support',
    text: 'Prototype planning, innovation labs, R&D guidance, patent direction, and emerging technology exploration.'
  },
  {
    icon: GraduationCap,
    title: 'Academic / Training Support',
    text: 'Smaller support vertical for project guidance, workshops, webinars, internships, and technical training requests.'
  }
];

const workshops = [
  {
    title: 'AI Innovation Starter Workshop',
    date: 'Upcoming',
    price: 9,
    audience: 'Students, professionals, founders, and early tech builders',
    points: ['AI use cases', 'Real-world problem mapping', 'Product idea framing', 'Certificate-ready attendance tracking later']
  }
];

const policyPages = {
  '/privacy-policy': {
    eyebrow: 'Privacy Policy',
    title: 'Privacy Policy',
    intro:
      'This Privacy Policy explains how KalDevsEduTech collects, uses, protects, and manages information across its technology platforms, digital services, WAPIMI-related services, workshops, contact forms, and product inquiries.',
    sections: [
      {
        title: 'Information We Collect',
        text:
          'We may collect your name, email address, phone number, organization or college name, inquiry details, service interests, payment references, technical usage data, and information you voluntarily submit through our forms or dashboards.'
      },
      {
        title: 'How We Use Information',
        text:
          'We use information to respond to inquiries, provide product or service support, process workshop registrations, improve our platforms, manage admin records, communicate updates, and maintain secure business operations.'
      },
      {
        title: 'Cookies',
        text:
          'Our website may use essential cookies or similar technologies for performance, analytics, session handling, and security. You can control cookies through your browser settings.'
      },
      {
        title: 'Payment Security',
        text:
          'Payments are processed through Razorpay or other authorized payment providers. KalDevsEduTech does not store full card numbers, CVV, UPI PINs, or sensitive banking credentials.'
      },
      {
        title: 'Third-Party Services',
        text:
          'We may use third-party services such as Razorpay, MongoDB, hosting providers, analytics tools, communication tools, and cloud services. Their use is governed by their own policies and security practices.'
      },
      {
        title: 'Data Protection',
        text:
          'We apply reasonable technical and organizational measures to protect data from unauthorized access, misuse, loss, or alteration. No digital system can be guaranteed completely risk-free.'
      },
      {
        title: 'User Rights',
        text:
          'You may request access, correction, or deletion of your personal information where applicable. Requests can be sent to our contact email.'
      },
      {
        title: 'Contact Information',
        text: 'For privacy questions, contact KalDevsEduTech at kaldevsedutech@gmail.com or +91 9493165230.'
      }
    ]
  },
  '/terms-and-conditions': {
    eyebrow: 'Terms & Conditions',
    title: 'Terms & Conditions',
    intro:
      'These Terms & Conditions govern access to KalDevsEduTech websites, products, services, WAPIMI-related services, workshops, and digital platforms.',
    sections: [
      {
        title: 'Eligibility',
        text:
          'By using our services, you confirm that you are legally capable of entering into these terms or have appropriate permission from a guardian, institution, or organization.'
      },
      {
        title: 'Account Registration',
        text:
          'Some products may require account registration. Users are responsible for providing accurate information and keeping account credentials secure.'
      },
      {
        title: 'Subscription Plans',
        text:
          'Digital products such as WAPIMI or future platforms may offer subscriptions, trials, or paid plans. Plan features, limits, and pricing may change with prior notice where applicable.'
      },
      {
        title: 'Payments',
        text:
          'Payments must be completed through approved payment gateways. Access to paid digital services may begin immediately after successful payment.'
      },
      {
        title: 'User Responsibilities',
        text:
          'Users must use services lawfully, maintain accurate information, avoid misuse, and comply with applicable platform, communication, marketing, and technology rules.'
      },
      {
        title: 'Acceptable Use Policy',
        text:
          'Users must not use KalDevsEduTech or WAPIMI services for spam, fraud, unauthorized access, harassment, illegal automation, data abuse, malware, or activity that harms others.'
      },
      {
        title: 'Intellectual Property',
        text:
          'All website content, branding, designs, software concepts, product names, and platform materials belong to KalDevsEduTech or their respective owners unless otherwise stated.'
      },
      {
        title: 'Limitation of Liability',
        text:
          'KalDevsEduTech provides digital services on a reasonable-effort basis and is not liable for indirect losses, third-party service failures, business interruption, or misuse by users.'
      },
      {
        title: 'Termination',
        text:
          'We may suspend or terminate access if users violate these terms, misuse services, fail payments, or engage in harmful or unlawful activity.'
      },
      {
        title: 'Governing Law',
        text:
          'These terms are governed by the laws of India, subject to applicable jurisdiction and legal requirements.'
      },
      {
        title: 'Contact Information',
        text: 'For terms-related questions, contact KalDevsEduTech at kaldevsedutech@gmail.com or +91 9493165230.'
      }
    ]
  },
  '/refund-policy': {
    eyebrow: 'Refund Policy',
    title: 'Refund and Cancellation Policy',
    intro:
      'At KalDevsEduTech, customer satisfaction is important. Since our products and WAPIMI-related offerings may include digital software services, subscriptions may be activated immediately after successful payment.',
    sections: [
      {
        title: 'Cancellation',
        text:
          'Users may cancel an active subscription from their dashboard where available. Cancellation prevents future renewals but does not automatically generate a refund.'
      },
      {
        title: 'General Refund Rule',
        text:
          'Payments already made are generally non-refundable because access to digital services, software features, workshop registration, or subscription benefits may be provided instantly.'
      },
      {
        title: 'Refund Eligibility',
        text:
          'Refunds may be considered only for duplicate payment, a technical issue that permanently prevents service activation, or an incorrect charge caused by a payment processing error.'
      },
      {
        title: 'Refund Timeline',
        text:
          'Approved refunds will be processed to the original payment method within 7 to 10 business days, depending on the payment gateway and banking provider.'
      },
      {
        title: 'Contact Information',
        text: 'For refund or cancellation requests, contact kaldevsedutech@gmail.com or +91 9493165230.'
      }
    ]
  },
  '/shipping-delivery-policy': {
    eyebrow: 'Shipping & Delivery',
    title: 'Shipping and Delivery Policy',
    intro:
      'KalDevsEduTech provides technology platforms, digital products, software services, WAPIMI-related services, workshops, and online support. No physical goods are shipped unless specifically stated for a future service.',
    sections: [
      {
        title: 'Digital Delivery',
        text:
          'After successful payment, users receive access to the subscribed plan, workshop, or digital service through their registered account, contact channel, or official communication method.'
      },
      {
        title: 'No Physical Shipping',
        text:
          'Most KalDevsEduTech and WAPIMI services are cloud-based or digital. Therefore, there are no courier charges, shipping timelines, or physical delivery requirements.'
      },
      {
        title: 'Activation Delays',
        text:
          'If activation is delayed due to technical issues, users should contact support. Most activation issues are resolved within one business day.'
      },
      {
        title: 'Support Email',
        text: 'For delivery or activation support, contact kaldevsedutech@gmail.com or +91 9493165230.'
      }
    ]
  }
};

function loadRazorpay() {
  return Boolean(window.Razorpay);
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [paymentState, setPaymentState] = useState('');
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname || '/');
  const [dynamicProducts, setDynamicProducts] = useState([]);

  useEffect(() => {
    const handleRouteChange = () => setCurrentPath(window.location.pathname || '/');
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then((response) => response.json())
      .then((data) => setDynamicProducts(data.products || []))
      .catch(() => setDynamicProducts([]));
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWorkshopPayment = async (workshop) => {
    if (!loadRazorpay()) {
      setPaymentState('Razorpay Checkout could not load. Please check your connection and try again.');
      return;
    }

    setPaymentState('Creating secure test order...');

    let order;
    try {
      const response = await fetch(`${API_BASE_URL}/api/payments/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workshopTitle: workshop.title, amount: workshop.price })
      });
      order = await response.json();
      if (!response.ok) throw new Error(order.message || 'Unable to create Razorpay order.');
    } catch (error) {
      setPaymentState(error.message);
      return;
    }

    const options = {
      key: order.keyId,
      amount: order.amount,
      currency: order.currency,
      name: 'KalDevsEduTech',
      description: workshop.title,
      order_id: order.orderId,
      image: '',
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      notes: {
        product: 'Workshop Registration',
        workshop: workshop.title
      },
      theme: {
        color: '#0B3D91'
      },
      async handler(response) {
        setPaymentState('Verifying test payment...');
        try {
          const verifyResponse = await fetch(`${API_BASE_URL}/api/payments/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...response,
              workshopTitle: workshop.title,
              amount: workshop.price
            })
          });
          const result = await verifyResponse.json();
          if (!verifyResponse.ok) throw new Error(result.message || 'Payment verification failed.');
          setPaymentState(`${result.message} Payment ID: ${response.razorpay_payment_id}`);
        } catch (error) {
          setPaymentState(error.message);
        }
      },
      modal: {
        ondismiss() {
          setPaymentState('Payment window closed. You can try registration again anytime.');
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const visibleProducts = useMemo(() => [...products, ...dynamicProducts], [dynamicProducts]);
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="/" aria-label="KalDevsEduTech home" onClick={(event) => { event.preventDefault(); navigate('/'); }}>
          <span className="brand-mark">
            <img src="/logokaldevs.png" alt="" />
          </span>
          <span>
            <strong>KalDevsEduTech</strong>
            <small>Timeless Innovation. Endless Solutions.</small>
          </span>
        </a>

        <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className={currentPath === href ? 'active' : ''}
              onClick={(event) => {
                event.preventDefault();
                navigate(href);
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="/contact" onClick={(event) => { event.preventDefault(); navigate('/contact'); }}>
          Start a Project <ArrowRight size={16} />
        </a>
        <button className="menu-button" type="button" aria-label="Toggle menu" onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main data-page={currentPath}>
        <section id="home" className="hero section-pad">
          <div className="hero-content">
            <img className="hero-logo" src="/logokaldevs.png" alt="KalDevsEduTech logo" />
            <div className="eyebrow">
              <Sparkles size={16} /> Emerging technology and innovation platform
            </div>
            <h1>Innovating Beyond Time. Building Intelligent Solutions.</h1>
            <p>
              KalDevsEduTech is a technology and innovation platform dedicated to solving real-world problems through
              software development, artificial intelligence, research, education, and digital solutions.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="/services" onClick={(event) => { event.preventDefault(); navigate('/services'); }}>
                Explore Services <ChevronRight size={18} />
              </a>
              <a className="button secondary" href="/products" onClick={(event) => { event.preventDefault(); navigate('/products'); }}>
                View Products
              </a>
              <a className="button ghost" href="/contact" onClick={(event) => { event.preventDefault(); navigate('/contact'); }}>
                Contact Us
              </a>
            </div>
          </div>
          <div className="hero-visual" aria-label="AI technology dashboard illustration">
            <div className="orbital-grid">
              <span />
              <span />
              <span />
            </div>
            <div className="signal-card top">
              <BrainCircuit size={28} />
              <strong>AI Systems</strong>
              <small>Agents, analytics, automation</small>
            </div>
            <div className="signal-card middle">
              <Rocket size={28} />
              <strong>Product Labs</strong>
              <small>WAPIMI, CRM, ERP, research</small>
            </div>
            <div className="signal-card bottom">
              <LineChart size={28} />
              <strong>Business Intelligence</strong>
              <small>Dashboards and decisions</small>
            </div>
          </div>
        </section>

        <section id="stats" className="stats-band" aria-label="KalDevsEduTech statistics">
          {stats.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section id="about" className="section-pad split-section">
          <div>
            <div className="section-kicker">About</div>
            <h2>Built as a tech-first brand, not just an educational platform.</h2>
          </div>
          <div className="rich-copy">
            <p>
              KalDevsEduTech is an emerging technology brand focused on innovation, research, intelligent software
              solutions, artificial intelligence, automation, and digital products.
            </p>
            <p>
              Education and training are included as support verticals, while the core identity remains technology,
              innovation, software products, R&D, and business solutions.
            </p>
            <div className="values">
              {['Innovation', 'Knowledge', 'Integrity', 'Quality', 'Research', 'Growth'].map((value) => (
                <span key={value}>
                  <Check size={15} /> {value}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section-pad muted">
          <div className="section-head">
            <div>
              <div className="section-kicker">Services</div>
              <h2>Technology services for real-world systems.</h2>
            </div>
            <a className="text-link" href="/contact" onClick={(event) => { event.preventDefault(); navigate('/contact'); }}>
              Request service inquiry <ArrowRight size={16} />
            </a>
          </div>
          <div className="card-grid three">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article className="service-card" key={service.title}>
                  <Icon size={30} />
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="products" className="section-pad">
          <div className="section-head">
            <div>
              <div className="section-kicker">Products</div>
              <h2>Product ecosystem planned for scale.</h2>
            </div>
            <p className="section-note">Products are marked clearly by status, with WAPIMI available through the KalDevsEduTech /wapimi route.</p>
          </div>
          <div className="card-grid products">
            {visibleProducts.map((product) => {
              const Icon = product.icon || Rocket;
              return (
                <article className="product-card" key={product.name}>
                  <div className="product-top">
                    <Icon size={28} />
                    <span>{product.status}</span>
                  </div>
                  <h3>{product.name}</h3>
                  <strong>{product.tag}</strong>
                  <p>{product.text}</p>
                  <a
                    href={product.link || '/contact'}
                    onClick={(event) => {
                      if (!product.link) {
                        event.preventDefault();
                        navigate('/contact');
                      }
                    }}
                  >
                    {product.action || 'Request details'}
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        <section id="career-hub" className="section-pad career-hub">
          <div className="career-copy">
            <div className="section-kicker">Product Page</div>
            <h2>KalDevsEduTech Career Hub</h2>
            <p>
              Career Hub is an in-development AI-powered career and opportunity platform for job seekers, interns,
              students, professionals, recruiters, and growing teams.
            </p>
            <p>
              It is planned to support smarter job discovery, internship matching, resume improvement, interview
              preparation, application tracking, and career roadmap guidance.
            </p>
            <a className="button primary" href="/contact" onClick={(event) => { event.preventDefault(); navigate('/contact'); }}>
              Ask About Career Hub <ArrowRight size={18} />
            </a>
          </div>
          <div className="career-panel">
            <div className="product-top">
              <Users size={30} />
              <span>In Development</span>
            </div>
            <h3>Planned Career Hub Capabilities</h3>
            <div className="feature-list">
              {careerHubFeatures.map((feature) => (
                <span key={feature}>
                  <Check size={16} /> {feature}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="innovation" className="section-pad innovation">
          <div className="section-head">
            <div>
              <div className="section-kicker">Innovation</div>
              <h2>Research, prototypes, automation, and next-generation technology.</h2>
            </div>
          </div>
          <div className="innovation-layout">
            <div className="innovation-panel">
              <h3>Innovation Lab Focus</h3>
              <p>
                AI, computer vision, cybersecurity, cloud systems, smart city concepts, healthcare technology,
                agriculture technology, robotics, IoT, and business automation.
              </p>
            </div>
            <div className="industry-list">
              {industries.map((industry) => (
                <span key={industry}>{industry}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="workshops" className="section-pad muted">
          <div className="section-head">
            <div>
              <div className="section-kicker">Upcoming Workshops</div>
              <h2>Focused sessions for practical technology innovation.</h2>
            </div>
          </div>
          <div className="workshop-card">
            <div>
              <span className="pill">
                <CalendarDays size={15} /> Upcoming Workshop
              </span>
              <h3>{workshops[0].title}</h3>
              <p>{workshops[0].audience}</p>
              <div className="workshop-points">
                {workshops[0].points.map((point) => (
                  <span key={point}>
                    <Check size={15} /> {point}
                  </span>
                ))}
              </div>
            </div>
            <div className="price-box">
              <span>Registration</span>
              <strong>Rs. {workshops[0].price}</strong>
              <button className="button primary full" type="button" onClick={() => handleWorkshopPayment(workshops[0])}>
                Pay with Razorpay
              </button>
              {paymentState && <p className="payment-state">{paymentState}</p>}
            </div>
          </div>
        </section>

        <section id="support" className="section-pad">
          <div className="section-head">
            <div>
              <div className="section-kicker">Support</div>
              <h2>Clear support paths by product, business need, and audience.</h2>
            </div>
          </div>
          <div className="card-grid four">
            {supportChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <article className="support-card" key={channel.title}>
                  <Icon size={28} />
                  <h3>{channel.title}</h3>
                  <p>{channel.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="academic" className="section-pad academic">
          <div>
            <div className="section-kicker">Smaller Vertical</div>
            <h2>Academic & Training Support</h2>
            <p>
              A focused support area for project guidance, workshops, webinars, internships, training requests,
              hackathons, and college collaboration. It supports the technology brand without becoming the main identity.
            </p>
          </div>
          <InquiryForm compact title="Academic / Training Inquiry" />
        </section>

        <section id="admin" className="section-pad muted">
          <div className="section-head">
            <div>
              <div className="section-kicker">Admin</div>
              <h2>Inquiry and payment dashboard.</h2>
            </div>
            <p className="section-note">Use the admin login from your local .env file to view submitted inquiries and verified workshop payments.</p>
          </div>
          <AdminPanel onProductsChanged={setDynamicProducts} />
        </section>

        <section id="contact" className="section-pad contact">
          <div>
            <div className="section-kicker">Contact</div>
            <h2>Start with an idea, product, workshop, or support request.</h2>
            <p>
              Route your inquiry to product support, business solutions, research support, workshop registration,
              or academic/training assistance.
            </p>
            <div className="contact-lines">
              <span>Email: kaldevsedutech@gmail.com</span>
              <span>Phone / WhatsApp: +91 9493165230</span>
              <span>Support: Product, business, research, workshop, and academic inquiries</span>
            </div>
          </div>
          <InquiryForm title="General Contact Form" />
        </section>

        {Object.entries(policyPages).map(([path, page]) => (
          <section key={path} id={path.slice(1)} className="section-pad policy-page">
            <div className="policy-shell">
              <div className="section-kicker">{page.eyebrow}</div>
              <h1>{page.title}</h1>
              <p className="policy-intro">{page.intro}</p>
              <div className="policy-sections">
                {page.sections.map((section) => (
                  <article key={section.title}>
                    <h2>{section.title}</h2>
                    <p>{section.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>

      <footer className="footer">
        <div>
          <strong>KalDevsEduTech</strong>
          <p>Technology, innovation, AI, research, software, and digital solutions platform.</p>
          <p>kaldevsedutech@gmail.com Â· +91 9493165230</p>
        </div>
        <div className="footer-links">
          {[...navItems, ...policyItems].map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={(event) => {
                event.preventDefault();
                navigate(href);
              }}
            >
              {label}
            </a>
          ))}
        </div>
        <span>Â© {year} KalDevsEduTech. All rights reserved.</span>
      </footer>
    </>
  );
}

function InquiryForm({ title, compact = false }) {
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState('');

  return (
    <form
      className={compact ? 'inquiry-form compact' : 'inquiry-form'}
      onSubmit={async (event) => {
        event.preventDefault();
        setStatus('Submitting inquiry...');
        const formData = new FormData(event.currentTarget);
        const payload = Object.fromEntries(formData.entries());
        payload.source = title;

        try {
          const response = await fetch(`${API_BASE_URL}/api/inquiries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const result = await response.json();
          if (!response.ok) throw new Error(result.message || 'Unable to submit inquiry.');
          setSubmitted(true);
          setStatus(result.message);
          event.currentTarget.reset();
        } catch (error) {
          setSubmitted(false);
          setStatus(error.message);
        }
      }}
    >
      <h3>{title}</h3>
      <div className="form-grid">
        <label>
          Full Name
          <input name="name" type="text" placeholder="Your name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" placeholder="you@example.com" required />
        </label>
        <label>
          Phone / WhatsApp
          <input name="phone" type="tel" placeholder="+91 00000 00000" />
        </label>
        <label>
          Company / College
          <input name="organization" type="text" placeholder="Organization name" />
        </label>
        <label>
          Inquiry Type
          <select name="type" defaultValue="Product Support">
            <option>Product Support</option>
            <option>Business Solution</option>
            <option>Research Support</option>
            <option>Workshop Registration</option>
            <option>Academic / Training Support</option>
            <option>WAPIMI</option>
            <option>Other</option>
          </select>
        </label>
        <label>
          Technology Area
          <input name="technology" type="text" placeholder="AI, web, cloud, IoT..." />
        </label>
      </div>
      <label>
        Message
        <textarea name="message" rows="5" placeholder="Tell us what you want to build or solve" required />
      </label>
      <button className="button primary full" type="submit">
        Submit Inquiry
      </button>
      {status && <p className={submitted ? 'success-state' : 'payment-state'}>{status}</p>}
    </form>
  );
}

function AdminPanel({ onProductsChanged }) {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('');
  const [inquiries, setInquiries] = useState([]);
  const [payments, setPayments] = useState([]);
  const [managedProducts, setManagedProducts] = useState([]);

  async function loadAdminData(adminToken) {
    const headers = { Authorization: `Bearer ${adminToken}` };
    const [inquiryResponse, paymentResponse, productResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/api/admin/inquiries`, { headers }),
      fetch(`${API_BASE_URL}/api/admin/payments`, { headers }),
      fetch(`${API_BASE_URL}/api/admin/products`, { headers })
    ]);
    const inquiryData = await inquiryResponse.json();
    const paymentData = await paymentResponse.json();
    const productData = await productResponse.json();
    if (!inquiryResponse.ok) throw new Error(inquiryData.message || 'Unable to load inquiries.');
    if (!paymentResponse.ok) throw new Error(paymentData.message || 'Unable to load payments.');
    if (!productResponse.ok) throw new Error(productData.message || 'Unable to load products.');
    setInquiries(inquiryData.inquiries || []);
    setPayments(paymentData.payments || []);
    setManagedProducts(productData.products || []);
    onProductsChanged(productData.products || []);
  }

  async function handleLogin(event) {
    event.preventDefault();
    setStatus('Checking admin login...');
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Admin login failed.');
      setToken(result.token);
      await loadAdminData(result.token);
      setStatus('Admin dashboard loaded.');
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function handleProductCreate(event) {
    event.preventDefault();
    if (!token) {
      setStatus('Login before adding products.');
      return;
    }

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Unable to add product.');
      const nextProducts = [result.product, ...managedProducts];
      setManagedProducts(nextProducts);
      onProductsChanged(nextProducts);
      event.currentTarget.reset();
      setStatus('Product added to public Products page.');
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function handleProductDelete(productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/products/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Unable to remove product.');
      const nextProducts = managedProducts.filter((product) => product._id !== productId);
      setManagedProducts(nextProducts);
      onProductsChanged(nextProducts);
      setStatus(result.message);
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <div className="admin-layout">
      <form className="inquiry-form admin-login" onSubmit={handleLogin}>
        <h3>Admin Login</h3>
        <label>
          Email
          <input name="email" type="email" placeholder="kaldevsedutech@gmail.com" required />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Admin password" required />
        </label>
        <button className="button primary full" type="submit">
          Login
        </button>
        {status && <p className="success-state">{status}</p>}
      </form>

      <div className="admin-results">
        <form className="admin-card product-control" onSubmit={handleProductCreate}>
          <h3>Add Public Product</h3>
          <label>
            Product Name
            <input name="name" type="text" placeholder="AJACA" required />
          </label>
          <label>
            Subtitle
            <input name="tag" type="text" placeholder="AI Job Application Copilot & Automation" required />
          </label>
          <label>
            Status
            <select name="status" defaultValue="In Development">
              <option>In Development</option>
              <option>Product Link Coming Soon</option>
              <option>Coming Soon</option>
              <option>Beta</option>
            </select>
          </label>
          <label>
            Description
            <textarea name="text" rows="4" placeholder="Describe the product" required />
          </label>
          <button className="button primary full" type="submit">
            Add Product
          </button>
        </form>
        <div className="admin-card">
          <h3>Inquiries</h3>
          {token && inquiries.length === 0 && <p>No inquiries yet.</p>}
          {inquiries.slice(0, 5).map((item) => (
            <article key={item._id}>
              <strong>{item.name}</strong>
              <span>{item.type} Â· {item.email}</span>
              <p>{item.message}</p>
            </article>
          ))}
        </div>
        <div className="admin-card">
          <h3>Verified Payments</h3>
          {token && payments.length === 0 && <p>No verified payments yet.</p>}
          {payments.slice(0, 5).map((item) => (
            <article key={item._id}>
              <strong>{item.workshopTitle}</strong>
              <span>Rs. {item.amount} - {item.status}</span>
              <p>{item.razorpayPaymentId}</p>
            </article>
          ))}
        </div>
        <div className="admin-card">
          <h3>Admin Products</h3>
          {token && managedProducts.length === 0 && <p>No admin-added products yet.</p>}
          {managedProducts.map((item) => (
            <article key={item._id}>
              <strong>{item.name}</strong>
              <span>{item.tag} Â· {item.status}</span>
              <p>{item.text}</p>
              <button className="button ghost full" type="button" onClick={() => handleProductDelete(item._id)}>
                Remove Product
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);



