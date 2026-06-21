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
  gridClass: string;
}

export default function Services() {
  const services: ServiceItem[] = [
    {
      id: '01',
      icon: Compass,
      title: 'Concept & Brand Curation',
      desc: 'Developing distinctive culinary concepts, custom branding positioning, and unique narrative architectures that stand out in crowded markets.',
      gridClass: 'grid-col-7',
    },
    {
      id: '02',
      icon: Navigation,
      title: 'Location Scouting & Feasibility',
      desc: 'Data-driven demographic research, high-traffic site identification, and rigorous lease negotiation advisory.',
      gridClass: 'grid-col-5',
    },
    {
      id: '03',
      icon: Sliders,
      title: 'Kitchen & Back-of-House Engineering',
      desc: 'Custom commercial kitchen workflow layouts, equipment procurement blueprints, and peak-hour load throughput calculations.',
      gridClass: 'grid-col-4',
    },
    {
      id: '04',
      icon: Layout,
      title: 'Spatial & Interior Architecture',
      desc: 'Creating immersive customer experiences through bespoke space planning, material selections, and sensory dining layout designs.',
      gridClass: 'grid-col-4',
    },
    {
      id: '05',
      icon: Shield,
      title: 'Project PMC & Site Delivery',
      desc: 'Comprehensive execution management, contractor oversight, timeline control, and local licensing assistance.',
      gridClass: 'grid-col-4',
    },
    {
      id: '06',
      icon: TrendingUp,
      title: 'Financial Modeling & OpEx Optimization',
      desc: 'Granular prime-cost models, labor scheduling architectures, menu pricing matrices, and inventory control structures.',
      gridClass: 'grid-col-5',
    },
    {
      id: '07',
      icon: Flame,
      title: 'Culinary & Menu Engineering',
      desc: 'Recipe standardization, kitchen cost analysis, supplier vetting, and plate presentation masterclasses.',
      gridClass: 'grid-col-7',
    },
    {
      id: '08',
      icon: Zap,
      title: 'Launch & Go-To-Market Acceleration',
      desc: 'Comprehensive pre-opening launch checklists, influencer curation campaigns, staff dry-runs, and post-opening performance tuning.',
      gridClass: 'grid-col-12',
    },
  ];

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        {/* Section tag */}
        <div className="section-tag-container">
          <span className="font-mono-accent">02 // Core Capabilities</span>
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
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
