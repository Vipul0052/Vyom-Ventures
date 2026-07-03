import { useEffect } from 'react';
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
  icon: React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
  title: string;
  desc: string;
  bullets: string[];
  image: string;
  gridClass: string;
}

export default function Services() {
  const services: ServiceItem[] = [
    {
      id: '01',
      icon: Compass,
      title: 'Consultancy & Strategy',
      desc: 'Blueprints and strategic feasibility audits to de-risk your investment.',
      bullets: [
        'Business Planning & Consultancy', 
        'Business Audit & Performance Improvement'
      ],
      image: '/service-consultancy.png',
      gridClass: 'grid-col-7',
    },
    {
      id: '02',
      icon: Layout,
      title: 'Turnkey Business Setup',
      desc: 'End-to-end guidance for setting up specialized entertainment and food concepts.',
      bullets: [
        'Restaurant Setup & Development',
        'Cafe Setup & Development',
        'Gaming Zone Setup & Development',
        'Cloud Kitchen Setup'
      ],
      image: '/service-turnkey.png',
      gridClass: 'grid-col-5',
    },
    {
      id: '03',
      icon: Sliders,
      title: 'Kitchen Design & Layout',
      desc: 'Functional workspaces mapped for workflow efficiency and equipment setup.',
      bullets: [
        'Kitchen Design & Layout Planning'
      ],
      image: '/service-kitchen.png',
      gridClass: 'grid-col-4',
    },
    {
      id: '04',
      icon: Flame,
      title: 'Culinary & Costing',
      desc: 'Menu engineering, standardizing recipes, and structuring pricing margins.',
      bullets: [
        'Menu Engineering',
        'Recipe Standardization',
        'Food Costing & Menu Pricing'
      ],
      image: '/service-culinary.png',
      gridClass: 'grid-col-4',
    },
    {
      id: '05',
      icon: Shield,
      title: 'SOPs & Recruitment',
      desc: 'Structuring service protocols and recruiting operational staff.',
      bullets: [
        'SOP Development', 
        'Staff Recruitment & Training'
      ],
      image: '/service-sop.png',
      gridClass: 'grid-col-4',
    },
    {
      id: '06',
      icon: TrendingUp,
      title: 'Operations & Growth Support',
      desc: 'Post-launch growth auditing and optimizing aggregator visibility.',
      bullets: [
        'Operations Management Support', 
        'Zomato & Swiggy Growth Support'
      ],
      image: '/service-operations.png',
      gridClass: 'grid-col-5',
    },
    {
      id: '07',
      icon: Zap,
      title: 'Branding & Marketing',
      desc: 'Developing brand guidelines, logo assets, and targeted social media marketing campaigns.',
      bullets: [
        'Branding & Business Identity', 
        'Social Media & Digital Marketing'
      ],
      image: '/service-branding.png',
      gridClass: 'grid-col-7',
    },
    {
      id: '08',
      icon: Navigation,
      title: 'Project PMC & Execution',
      desc: 'Monitoring tenders, contractor schedules, and budget metrics.',
      bullets: [
        'Project Management & Execution'
      ],
      image: '/service-pmc.png',
      gridClass: 'grid-col-12',
    },
  ];

  useEffect(() => {
    // Only run scroll observer and hover tracker on desktop (since mobile has top header images which are already fully visible)
    const isDesktop = window.innerWidth > 1024;
    if (!isDesktop) return;

    const cards = document.querySelectorAll('.premium-card');
    
    // 1. IntersectionObserver for scroll-active
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-active');
        } else {
          entry.target.classList.remove('scroll-active');
        }
      });
    }, {
      threshold: 0.05, // trigger immediately when card enters viewport
      rootMargin: '5% 0px 5% 0px' // pre-trigger margins
    });

    cards.forEach(card => observer.observe(card));

    // 2. Trackpad scroll-hover synchronization via coordinate tracking
    const mousePos = { x: -1, y: -1 };

    const updateHoverState = (x: number, y: number) => {
      const element = document.elementFromPoint(x, y);
      if (!element) return;

      const hoveredCard = element.closest('.premium-card');
      cards.forEach(card => {
        if (card === hoveredCard) {
          card.classList.add('js-hover');
        } else {
          card.classList.remove('js-hover');
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      updateHoverState(e.clientX, e.clientY);
    };

    const handleScroll = () => {
      if (mousePos.x === -1 || mousePos.y === -1) return;
      updateHoverState(mousePos.x, mousePos.y);
    };

    const handleMouseLeave = () => {
      cards.forEach(card => card.classList.remove('js-hover'));
      mousePos.x = -1;
      mousePos.y = -1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cards.forEach(card => observer.unobserve(card));
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

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
                {/* Border Drawing Lines (Draws around whole card) */}
                <div className="card-border-wrap">
                  <span className="border-right"></span>
                  <span className="border-bottom"></span>
                  <span className="border-left"></span>
                </div>

                {/* Top Image Header */}
                <div className="service-image-wrapper">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="service-card-img" 
                    loading="lazy"
                  />
                  <div className="service-image-overlay" />
                </div>

                {/* Text Content below the image */}
                <div className="service-card-content">
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
                      {services.find(s => s.id === service.id)?.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} style={{ fontSize: '0.82rem', color: 'var(--color-muted)', display: 'flex', alignItems: 'flex-start', gap: '0.45rem', textAlign: 'left' }}>
                          <span style={{ color: 'var(--color-gold)', lineHeight: '1.2' }}>•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
