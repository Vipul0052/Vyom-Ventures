import { ArrowUpRight } from 'lucide-react';

export default function Industries() {
  const industries = [
    { num: '01', name: 'Premium Restaurants' },
    { num: '02', name: 'Bespoke Cafes & Bakeries' },
    { num: '03', name: 'Multi-Brand Cloud Kitchens' },
    { num: '04', name: 'Modern Gaming & Tech Arenas' },
    { num: '05', name: 'Luxury Hospitality & Resorts' },
    { num: '06', name: 'Corporate Food Courts' },
  ];

  return (
    <section id="industries" className="industries-section">
      <div className="industries-container">
        {/* Section tag */}
        <div className="section-tag-container" style={{ paddingLeft: '4rem' }}>
          <span className="font-mono-accent">04 // Core Verticals</span>
        </div>

        <div className="industries-list">
          {industries.map((ind) => (
            <div key={ind.num} className="industry-item clickable">
              {/* Soft background color wash on hover */}
              <div className="industry-bg-wash" />
              
              <div className="industry-content-row">
                <div className="industry-left-group">
                  <span className="industry-num font-mono-accent">{ind.num}</span>
                  <h3 className="industry-name">{ind.name}</h3>
                </div>
                <div className="industry-arrow-box">
                  <ArrowUpRight className="industry-arrow" size={32} strokeWidth={1} />
                </div>
              </div>
            </div>
          ))}
          {/* Bottom border line for final item */}
          <div className="industry-list-bottom-line" />
        </div>
      </div>
    </section>
  );
}
