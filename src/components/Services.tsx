import { 
  Compass, 
  Navigation, 
  Sliders, 
  Layout, 
  Shield, 
  TrendingUp, 
  Flame, 
  Zap 
} from 'lucide-react';

interface ServiceItem {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  desc: string;
  bullets: string[];
  gridClass: string;
}

export default function Services() {
  const services: ServiceItem[] = [
    {
      id: '01',
      icon: Compass,
      title: 'Consultancy & Strategy',
      desc: 'Formulating strategic blueprints and performing diagnostics to de-risk your investment.',
      bullets: [
        'Business Planning & Consultancy', 
        'Business Audit & Performance Improvement'
      ],
      gridClass: 'grid-col-7',
    },
    {
      id: '02',
      icon: Layout,
      title: 'Turnkey Business Setup',
      desc: 'Seamlessly building out specialized spaces for key entertainment and culinary niches.',
      bullets: [
        'Restaurant Setup & Development',
        'Cafe Setup & Development',
        'Gaming Zone Setup & Development',
        'Cloud Kitchen Setup'
      ],
      gridClass: 'grid-col-5',
    },
    {
      id: '03',
      icon: Sliders,
      title: 'Kitchen Design & Layout',
      desc: 'Designing custom workspaces engineered for workflow throughput and spatial compliance.',
      bullets: [
        'Kitchen Design & Layout Planning'
      ],
      gridClass: 'grid-col-4',
    },
    {
      id: '04',
      icon: Flame,
      title: 'Culinary & Costing',
      desc: 'Structuring menus and standardizing recipes to guarantee constant margins and flavor profiles.',
      bullets: [
        'Menu Engineering',
        'Recipe Standardization',
        'Food Costing & Menu Pricing'
      ],
      gridClass: 'grid-col-4',
    },
    {
      id: '05',
      icon: Shield,
      title: 'SOPs & Recruitment',
      desc: 'Developing handbooks and training operations staff to maintain consistent service quality.',
      bullets: [
        'SOP Development', 
        'Staff Recruitment & Training'
      ],
      gridClass: 'grid-col-4',
    },
    {
      id: '06',
      icon: TrendingUp,
      title: 'Operations & Growth Support',
      desc: 'Monitoring post-launch metrics and deploying search/delivery optimization models.',
      bullets: [
        'Operations Management Support', 
        'Zomato & Swiggy Growth Support'
      ],
      gridClass: 'grid-col-5',
    },
    {
      id: '07',
      icon: Zap,
      title: 'Brand & Identity',
      desc: 'Establishing rich brand assets and launching high-engagement social media campaigns.',
      bullets: [
        'Branding & Business Identity', 
        'Social Media Marketing'
      ],
      gridClass: 'grid-col-7',
    },
    {
      id: '08',
      icon: Navigation,
      title: 'Project PMC & Execution',
      desc: 'Turnkey execution monitoring to ensure builds finish on schedule and on budget.',
      bullets: [
        'Project Management & Execution'
      ],
      gridClass: 'grid-col-12',
    },
  ];

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        {/* Section tag */}
        <div className="section-tag-container">
          <span className="font-mono-accent">02 // Our Services</span>
        </div>

        <div className="services-intro">
          <h2 className="services-title">
            Tailored solutions to build, scale, and optimize your business.
          </h2>
          <p className="services-subtitle">
            We provide specialized consulting across every milestone of the hospitality lifecycle.
          </p>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid-asymmetric">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className={`premium-card ${service.gridClass}`}>
                {/* Border Drawing Lines */}
                <div className="card-border-wrap">
                  <span className="border-right"></span>
                  <span className="border-bottom"></span>
                  <span className="border-left"></span>
                </div>

                <div className="service-card-header">
                  <div className="service-icon-box">
                    <IconComponent className="service-icon" size={24} strokeWidth={1.5} />
                  </div>
                  <span className="service-id">{service.id}</span>
                </div>

                <div className="service-card-body" style={{ marginBottom: 0 }}>
                  <h3 className="service-card-title" style={{ marginBottom: '0.75rem' }}>{service.title}</h3>
                  <p className="service-card-desc" style={{ marginBottom: '1.25rem' }}>{service.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    {service.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} style={{ fontSize: '0.82rem', color: 'var(--color-muted)', display: 'flex', alignItems: 'flex-start', gap: '0.45rem', textAlign: 'left' }}>
                        <span style={{ color: 'var(--color-gold)', lineHeight: '1.2' }}>•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
