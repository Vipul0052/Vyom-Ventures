import React, { useState, useRef, useEffect } from 'react';
import Magnetic from './Magnetic';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    businessType: '',
    services: [] as string[],
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const serviceOptions = [
    'Consultancy & Strategy',
    'Turnkey Setup',
    'Kitchen Design & Layout',
    'Culinary & Costing',
    'SOPs & Recruitment',
    'Operations & Growth',
    'Branding & Marketing',
    'Project PMC'
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const isSelected = prev.services.includes(service);
      const updatedServices = isSelected
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services: updatedServices };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "61cd8dbd-ef11-43a0-b8bf-735285b32079",
          name: formData.name,
          phone: formData.phone,
          businessType: formData.businessType,
          services: formData.services.join(', '),
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setFormData({ name: '', phone: '', businessType: '', services: [], message: '' });
        // Automatically hide the success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        setSubmitError(data.message || "Failed to submit inquiry. Please try again.");
      }
    } catch (error) {
      setSubmitError("Something went wrong. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        {/* Section tag */}
        <div className="section-tag-container">
          <span className="font-mono-accent">06 // Partner With Us</span>
        </div>

        <div className="contact-grid">
          {/* Left Column: Big Headline */}
          <div className="contact-left">
            <h2 className="contact-headline">
              Let’s build <br />
              something <span className="display-serif-italic">enduring</span>.
            </h2>
            
            {/* Quick Contact Info */}
            <div className="contact-info-block font-mono-accent">
              <div className="info-item">
                <span className="info-label">Direct Inquiry</span>
                <a href="mailto:info@vyomnexus.com" className="info-value">info@vyomnexus.com</a>
              </div>
              <div className="info-item">
                <span className="info-label">Call Support</span>
                <a href="tel:+917078717681" className="info-value">+91 70787 17681</a>
              </div>
              <div className="info-item">
                <span className="info-label">Office Location</span>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Reach+3+Roads+Sector+70+Gurugram" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="info-value"
                >
                  Shop No. 311, 3rd Floor, Reach 3 Roads, Sector 70, Gurugram, Haryana 122101
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Minimal Form */}
          <div className="contact-right">
            {isSubmitted ? (
              <div className="form-success-message">
                <span className="success-icon">✓</span>
                <h3 className="success-title font-mono-accent">Submission Received</h3>
                <p className="success-desc">Our project team will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="form-input"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Contact Number"
                    className="form-input"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    placeholder="Business Type (e.g. Cloud Kitchen, Cafe)"
                    className="form-input"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group services-selection-group" ref={dropdownRef}>
                  <label className="form-label font-mono-accent">Services Required</label>
                  <div className="custom-dropdown-container">
                    <button
                      type="button"
                      onClick={() => !isSubmitting && setIsDropdownOpen(!isDropdownOpen)}
                      className={`custom-dropdown-trigger ${isDropdownOpen ? 'active' : ''}`}
                      disabled={isSubmitting}
                    >
                      <span className="trigger-text">
                        {formData.services.length === 0
                          ? 'Select Services'
                          : `${formData.services.length} ${formData.services.length === 1 ? 'Service' : 'Services'} Selected`}
                      </span>
                      <span className={`trigger-arrow ${isDropdownOpen ? 'rotated' : ''}`}>▼</span>
                    </button>

                    {isDropdownOpen && !isSubmitting && (
                      <div className="custom-dropdown-menu">
                        {serviceOptions.map((option) => {
                          const isSelected = formData.services.includes(option);
                          return (
                            <label key={option} className="dropdown-item-label">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleServiceToggle(option)}
                                className="dropdown-checkbox"
                                disabled={isSubmitting}
                              />
                              <span className="checkbox-custom"></span>
                              <span className="dropdown-item-text">{option}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your vision or project scale"
                    className="form-input form-textarea"
                    rows={4}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {submitError && (
                  <div className="form-error-message" style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '-1rem', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>
                    Error: {submitError}
                  </div>
                )}

                <div className="form-submit-container">
                  <Magnetic>
                    <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                    </button>
                  </Magnetic>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
