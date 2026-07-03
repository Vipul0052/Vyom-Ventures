import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

export default function NotFound() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="not-found-screen">
      {/* Background drifting watermark */}
      <div className="not-found-watermark">404</div>

      <div className="not-found-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="not-found-header"
        >
          <span className="not-found-tag font-mono-accent">Error Code // 404</span>
          <h1 className="not-found-title display-serif-italic">Lost in Spatial Design</h1>
          <p className="not-found-desc">
            The page you are looking for has been moved, renamed, or does not exist in our architectural records.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="not-found-btn-wrapper"
        >
          <Magnetic>
            <button 
              onClick={handleGoHome} 
              className="premium-btn btn-primary"
              aria-label="Return to Homepage"
            >
              <span>Return to Homepage</span>
              <svg 
                viewBox="0 0 24 24" 
                width="16" 
                height="16" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ marginLeft: '8px' }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </Magnetic>
        </motion.div>
      </div>
    </div>
  );
}
