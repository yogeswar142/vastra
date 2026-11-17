import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTryOn } from '../context/TryOnContext';
import { PinInput } from '../components/PinInput';
import { Lock, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import frontPageModelImg from '../assets/front-page-model.png';
import '../styles/login.css';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, pinError } = useTryOn();
  const [pinDigits, setPinDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePinChange = (newDigits: string[]) => {
    setPinDigits(newDigits);
    if (localError) setLocalError(null);
  };

  const handleVerify = (pinToTest?: string) => {
    const fullPin = pinToTest || pinDigits.join('');
    if (fullPin.length < 6) {
      setLocalError('Please enter all 6 digits of your showroom PIN.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const success = login(fullPin);
      setIsSubmitting(false);
      if (success) {
        navigate('/atelier');
      } else {
        setLocalError('Invalid Showroom PIN. Please try again.');
        setPinDigits(['', '', '', '', '', '']);
      }
    }, 280);
  };

  const handleFillDemoPin = () => {
    const demo = ['4', '8', '2', '9', '1', '6'];
    setPinDigits(demo);
    setLocalError(null);
    handleVerify(demo.join(''));
  };

  return (
    <div className="login-container">
      {/* 
        ======================================================================
        POSTER SECTION (65-75% mobile viewport height, 100vh desktop split)
        Visual Hierarchy: VASTRA Brand -> Model -> Headline -> Lower Text
        ======================================================================
      */}
      <motion.section
        className="login-editorial"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        aria-label="VASTRA Editorial Campaign Poster"
      >
        {/* Model Photograph */}
        <img
          src={frontPageModelImg}
          alt="Traditional Saree Haute Couture Campaign"
          className="editorial-bg-image"
          loading="eager"
        />

        {/* Cinematic dark overlay with warm lighting */}
        <div className="editorial-gradient-overlay" />

        {/* Thin antique-gold frame & peacock feather motif */}
        <div className="editorial-gold-decorations" aria-hidden="true">
          <div className="decor-border-outer">
            <span className="decor-corner decor-corner-tl" />
            <span className="decor-corner decor-corner-br" />
            {/* Subtle Peacock feather ornament in corner */}
            <div className="peacock-motif-wrap" title="Heritage Peacock Zari Motif">
              <svg viewBox="0 0 40 40" className="peacock-svg" fill="none">
                <path
                  d="M20 4 C14 12, 10 18, 10 24 A10 10 0 0 0 30 24 C30 18, 26 12, 20 4 Z"
                  stroke="var(--color-antique-gold)"
                  strokeWidth="1"
                  strokeOpacity="0.45"
                />
                <circle
                  cx="20"
                  cy="22"
                  r="4"
                  fill="var(--color-peacock-teal)"
                  fillOpacity="0.5"
                  stroke="var(--color-antique-gold-light)"
                  strokeWidth="0.8"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 1. Brand Logo and Tagline (Upper-left region, away from model face) */}
        <header className="editorial-header">
          <div className="brand-lockup">
            <h1 className="editorial-brand-name">
              VAST<span>R</span>A
            </h1>
            <span className="editorial-descriptor">THE VIRTUAL SAREE ATELIER</span>
          </div>
        </header>

        {/* 2 & 3. Lower Poster Area: Main Editorial Headline + Supporting Paragraph */}
        <div className="editorial-lower-content">
          <div className="poster-text-backing">
            <h2 className="poster-headline">
              Timeless drapes. <em>A new perspective.</em>
            </h2>
            <p className="poster-description">
              Showroom staff can guide clients through our heirloom Kanchipuram, Banarasi, and Gadwal silk collections with true-to-life fall and luster.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 
        ======================================================================
        CREAM LOGIN SECTION (Positioned BELOW the poster on mobile)
        Reached via natural vertical scroll; 45% split on desktop
        ======================================================================
      */}
      <motion.section
        className="login-panel-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <div className="login-auth-card">
          <div className="auth-card-badge">
            <ShieldCheck size={13} />
            <span>Showroom Access Only</span>
          </div>

          <h2 className="auth-heading">Showroom Staff Sign In</h2>
          <p className="auth-description">
            Enter your showroom access PIN to begin your virtual draping experience.
          </p>

          <form
            className="pin-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleVerify();
            }}
          >
            {/* Six separate PIN input boxes */}
            <div className="pin-input-section">
              <PinInput
                value={pinDigits}
                onChange={handlePinChange}
                onComplete={(pin) => handleVerify(pin)}
                hasError={Boolean(localError || pinError)}
                disabled={isSubmitting}
              />
            </div>

            {/* Error Message */}
            {(localError || pinError) && (
              <div className="pin-error-alert" role="alert">
                <AlertCircle size={15} />
                <span>{localError || pinError}</span>
              </div>
            )}

            {/* Compact single-line Demo PIN Information */}
            <div className="demo-pin-hint">
              <span className="hint-label">DEMO PIN</span>
              <button
                type="button"
                className="hint-code-btn"
                onClick={handleFillDemoPin}
                title="Click to auto-fill demo PIN"
              >
                <strong>482916</strong>
                <span className="btn-action-text">(Click to Fill)</span>
              </button>
            </div>

            {/* Primary Submit Button: Min 52px height */}
            <button
              type="submit"
              className="btn btn-primary submit-btn"
              disabled={isSubmitting || pinDigits.some((d) => !d)}
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Enter Atelier'}</span>
              <ArrowRight size={16} />
            </button>

            {/* Security Note */}
            <div className="auth-security-note">
              <Lock size={12} />
              <span>Encrypted showroom terminal connection</span>
            </div>
          </form>
        </div>
      </motion.section>
    </div>
  );
};
