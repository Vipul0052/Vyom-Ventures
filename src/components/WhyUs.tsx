import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function WhyUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const points = [
    {
      title: 'Professional Planning',
      desc: 'We structure detail-oriented project roadmaps, financial modeling, and OpEx planning to de-risk your deployment.',
    },
    {
      title: 'Practical Industry Experience',
      desc: 'Our advisory team comprises veteran culinary operators, head chefs, and commercial site PMCs.',
    },
    {
      title: 'End-to-End Project Support',
      desc: 'We walk with you from initial location scouting and permitting to turnkey handovers and training.',
    },
    {
      title: 'Customized Business Solutions',
      desc: 'No templates or boilerplate packages. We build layouts and business designs tailored specifically to your site.',
    },
    {
      title: 'Efficient Execution',
      desc: 'Strong local NCR contractor networks enable rapid mobilization, preventing budget creeps and scheduling delays.',
    },
    {
      title: 'Long-Term Business Support',
      desc: 'We remain your partner post-launch, providing operational audits, Zomato/Swiggy marketing, and menu updates.',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    // GSAP animate checkmarks when in view
    const paths = containerRef.current?.querySelectorAll('.checkmark-path');
    if (paths) {
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }

    // GSAP fade in text points
    const items = containerRef.current?.querySelectorAll('.why-us-item');
    if (items) {
      gsap.fromTo(
        items,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' }
      );
    }
  }, [inView]);

  return (
    <section ref={containerRef} id="why-us" className="why-us-section">
      <div className="why-us-container">
        {/* Section tag */}
        <div className="section-tag-container">
          <span className="font-mono-accent">05 // The Advantage</span>
        </div>

        <div className="why-us-grid">
          {/* Left Column: Stacked list with checkmarks */}
          <div className="why-us-left">
            <div className="why-us-list">
              {points.map((point, index) => (
                <div key={index} className="why-us-item">
                  <div className="checkmark-box">
                    <svg viewBox="0 0 24 24" className="checkmark-svg" fill="none">
                      <path
                        className="checkmark-path"
                        d="M4.5 12.5 L9.5 17.5 L19.5 6.5"
                        stroke="var(--color-gold)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="25"
                        strokeDashoffset="25"
                      />
                    </svg>
                  </div>
                  <div className="why-us-text">
                    <h3 className="why-us-title">{point.title}</h3>
                    <p className="why-us-desc">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Large Statement */}
          <div className="why-us-right">
            <div className="why-us-statement-box">
              <h2 className="why-us-statement display-serif-italic">
                “We don’t just draw up plans. We build the physical spaces and operational engines right alongside you.”
              </h2>
              <div className="statement-line-accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
