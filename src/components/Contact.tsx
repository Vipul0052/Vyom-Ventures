import React, { useState } from 'react';
import Magnetic from './Magnetic';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    businessType: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, submit the form here
    console.log('Submitted data:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', phone: '', businessType: '', message: '' });
    }, 3000);
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
                <a href="mailto:info@vyomnexus.in" className="info-value">info@vyomnexus.in</a>
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
                  3rd Floor, Reach 3 Roads, Shop No. 311, Sector 70, Gurugram, Haryana 122101
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
                  />
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
                  />
                </div>

                <div className="form-submit-container">
                  <Magnetic>
                    <button type="submit" className="form-submit-btn">
                      Submit Inquiry
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
