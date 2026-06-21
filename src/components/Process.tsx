import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  points: string[];
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const steps: ProcessStep[] = [
    {
      num: '01',
      title: 'Discovery & Analytics',
      desc: 'We perform a complete operational diagnostic of your current setup or financial plans.',
      points: ['Demographic profiling', 'Prime cost vetting', 'Menu margin auditing'],
    },
    {
      num: '02',
      title: 'Spatial Concept Engineering',
      desc: 'Our architects construct the sensory dining layouts and high-throughput kitchen blueprints.',
      points: ['Kitchen flow routing', 'Interior mood-boards', 'CAD equipment schedules'],
    },
    {
      num: '03',
      title: 'PMC & Project Delivery',
      desc: 'We coordinate procurement timelines, manage local licensing, and oversee construction quality.',
      points: ['General contractor vetting', 'Timeline scheduling', 'Site audits & safety check'],
    },
    {
      num: '04',
      title: 'Staffing & Operational Setup',
      desc: 'Vetting head chefs, training floor staff, standardizing recipes, and establishing POS systems.',
      points: ['Standard Operating Procedures', 'Recruitment templates', 'Recipe scaling audits'],
    },
    {
      num: '05',
      title: 'Launch & Operational Handover',
      desc: 'Executing opening week checklists and setting up dashboard performance loops for continuous growth.',
      points: ['Influencer campaign coordination', 'Opening dry-runs', 'OpEx dashboard integration'],
    },
  ];

  const handleViewportScroll = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const isDesktop = window.innerWidth > 900;
    if (!isDesktop) {
      const scrollWidth = viewport.scrollWidth - viewport.clientWidth;
      if (scrollWidth > 0) {
        const currentProgress = viewport.scrollLeft / scrollWidth;
        setProgress(currentProgress);
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const mm = gsap.matchMedia();

    // Desktop GSAP scroll trigger
    mm.add("(min-width: 901px)", () => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDist = trackWidth - viewportWidth + 160;

      const scrollTween = gsap.to(track, {
        x: -scrollDist,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${scrollDist * 1.2}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(self.progress);
          },
        },
      });

      const cards = track.querySelectorAll('.process-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card.querySelector('.process-vertical-line'),
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'left right-=200px',
              containerAnimation: scrollTween,
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    // Mobile cleanup and progress sync
    mm.add("(max-width: 900px)", () => {
      gsap.set(track, { clearProps: 'all' });
      const lines = track.querySelectorAll('.process-vertical-line');
      gsap.set(lines, { clearProps: 'all' });
      
      const viewport = viewportRef.current;
      if (viewport) {
        const scrollWidth = viewport.scrollWidth - viewport.clientWidth;
        if (scrollWidth > 0) {
          setProgress(viewport.scrollLeft / scrollWidth);
        } else {
          setProgress(0);
        }
      } else {
        setProgress(0);
      }
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div ref={containerRef} id="process" className="process-scroll-container">
      <div className="process-sticky-wrapper">
        <div className="process-header-bar">
          <div className="process-header-container">
            <span className="font-mono-accent">03 // The Methodology</span>
            <div className="process-indicator">
              <span className="indicator-label">Progress Loop // Step 0{Math.min(5, Math.max(1, Math.round(progress * 4) + 1))} of 05</span>
              <div className="indicator-bar">
                <div 
                  className="indicator-fill" 
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div 
          ref={viewportRef} 
          className="process-viewport-container"
          onScroll={handleViewportScroll}
        >
          <div ref={trackRef} className="process-track">
            {/* Introductory title card */}
            <div className="process-intro-card">
              <h2 className="process-section-title">
                Our Five-Phase <span className="display-serif-italic">Delivery</span> Path
              </h2>
              <p className="process-section-desc">
                From initial diagnostic audits to spatial handover and marketing launches, we manage the complete lifecycle.
              </p>
              <div className="mobile-swipe-hint">
                <span>Swipe horizontally</span>
                <span className="swipe-arrow">⟶</span>
              </div>
              <div className="scroll-indicator-hint font-mono-accent">
                <span>Scroll vertically to advance</span>
                <span className="arrow-down">↓</span>
              </div>
            </div>

            {/* Step cards */}
            {steps.map((step, index) => (
              <div key={index} className="process-card">
                {/* Vertical drawing line */}
                <div className="process-vertical-line" />

                <div className="process-card-content">
                  {/* Step Watermark */}
                  <span className="process-watermark">{step.num}</span>
                  
                  <div className="process-card-header">
                    <span className="process-num-tag font-mono-accent">Phase {step.num}</span>
                    <h3 className="process-card-title">{step.title}</h3>
                  </div>

                  <p className="process-card-desc">{step.desc}</p>

                  <ul className="process-points-list">
                    {step.points.map((point, pIdx) => (
                      <li key={pIdx} className="process-point-item">
                        <span className="point-bullet">―</span> {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
