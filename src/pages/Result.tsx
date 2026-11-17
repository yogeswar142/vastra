import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTryOn } from '../context/TryOnContext';
import { Navbar } from '../components/Navbar';
import { GenerationLoader } from '../components/GenerationLoader';
import { RefreshCw, Camera, RotateCcw, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/result.css';

export const Result: React.FC = () => {
  const navigate = useNavigate();
  const {
    selectedSaree,
    customerPhoto,
    resultImage,
    clearCustomerPhoto,
    resetSession,
  } = useTryOn();

  // State A: Processing, State B: Generated Result
  const [isProcessing, setIsProcessing] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'tryon' | 'original'>('tryon');

  // Determine output image based on selected saree
  const displayedResultUrl =
    selectedSaree?.resultImageUrl ||
    (selectedSaree?.imageUrl?.includes('saree-tst2') || selectedSaree?.imageUrl?.includes('saree-sample-2')
      ? '/demo/output-tst2.png'
      : selectedSaree?.imageUrl?.includes('saree-tst3')
      ? '/demo/output-tst3.png'
      : selectedSaree?.imageUrl?.includes('saree-tst4')
      ? '/demo/output-tst4.png'
      : selectedSaree?.imageUrl?.includes('saree-tst5')
      ? '/demo/output-tst5.png'
      : resultImage || '/demo/output-tst1.png');

  const displayedImage =
    viewMode === 'original' && customerPhoto?.imageUrl
      ? customerPhoto.imageUrl
      : displayedResultUrl;

  const handleTryAnotherSaree = () => {
    // Return to /atelier while retaining the customer photograph
    navigate('/atelier');
  };

  const handleChangePhotograph = () => {
    // Return to /atelier with customer photograph selection cleared
    clearCustomerPhoto();
    navigate('/atelier');
  };

  const handleStartNewSession = () => {
    // Return to /login and reset the demo session
    resetSession();
    navigate('/login');
  };

  return (
    <div className="result-page">
      {/* State A: Processing Animation (approx 3.5s) */}
      <AnimatePresence>
        {isProcessing && (
          <GenerationLoader
            onComplete={() => setIsProcessing(false)}
            durationMs={3500}
          />
        )}
      </AnimatePresence>

      <Navbar />

      <main className="result-main">
        <div className="container">
          {/* 1 & 2 & 3: Compact Header & Demo Preview Indicator */}
          <motion.header
            className="result-header"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: isProcessing ? 0.15 : 0 }}
          >
            <div className="result-demo-pill">
              <span className="demo-pill-dot" />
              <span>SHOWROOM ATELIER PREVIEW</span>
            </div>
            <h1 className="result-headline">Your saree, your style.</h1>
            <p className="result-subtitle">
              Here's your virtual draping preview.
            </p>
          </motion.header>

          {/* Result Content: Mobile order (Image -> Product Info -> Actions) */}
          <div className="result-content-grid">
            {/* 4. Large Generated Result Image */}
            <motion.div
              className="result-image-wrapper"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="frame-corner fc-tl" />
              <span className="frame-corner fc-tr" />
              <span className="frame-corner fc-bl" />
              <span className="frame-corner fc-br" />

              <div className="result-image-frame">
                <img
                  src={displayedImage}
                  alt="Virtual Saree Try-On Output"
                  className="result-main-img"
                  loading="eager"
                />
              </div>

              {/* View Mode Controls: Toggle Virtual Drape vs Original */}
              <div className="result-view-controls">
                <div className="view-mode-toggle" role="group" aria-label="Preview display modes">
                  <button
                    type="button"
                    className={`toggle-pill ${viewMode === 'tryon' ? 'is-active' : ''}`}
                    onClick={() => setViewMode('tryon')}
                  >
                    Virtual Drape
                  </button>
                  <button
                    type="button"
                    className={`toggle-pill ${viewMode === 'original' ? 'is-active' : ''}`}
                    onClick={() => setViewMode('original')}
                  >
                    Original Photo
                  </button>
                </div>

                <div className="zoom-hint">
                  <CheckCircle size={12} color="var(--color-peacock-teal)" />
                  <span>Kanchipuram Silk Drape Verified</span>
                </div>
              </div>
            </motion.div>

            {/* 5 & 6: Product Information & Action Buttons */}
            <motion.div
              className="result-story-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="result-story-header">
                <span className="eyebrow story-eyebrow">DRAPED COLLECTION SPECIMEN</span>
                <h2 className="product-editorial-title">
                  {selectedSaree?.name || 'Peacock Heritage Silk'}
                </h2>
                <span className="product-code-highlight">
                  {selectedSaree?.code || 'KS-104'}
                </span>
              </div>

              {/* Product Specifications Card */}
              <div className="product-details-summary-card">
                <div className="summary-spec-list">
                  <div className="summary-spec-row">
                    <span className="summary-spec-label">Category</span>
                    <span className="summary-spec-val">
                      {selectedSaree?.category || 'Kanchipuram Silk'}
                    </span>
                  </div>

                  <div className="summary-spec-row">
                    <span className="summary-spec-label">Colour Palette</span>
                    <span className="summary-spec-val">
                      {selectedSaree?.color || 'Peacock Teal'}
                    </span>
                  </div>

                  <div className="summary-spec-row">
                    <span className="summary-spec-label">Zari Purity</span>
                    <span className="summary-spec-val">Certified Antique Gold Zari</span>
                  </div>

                  <div className="summary-spec-row">
                    <span className="summary-spec-label">Weave Technique</span>
                    <span className="summary-spec-val">Pure Handloom Korvai</span>
                  </div>
                </div>

                <p className="summary-notes">
                  {selectedSaree?.description ||
                    'Pure mulberry silk woven with antique gold zari motifs and traditional contrast border.'}
                </p>
              </div>

              {/* 6. Three Action Buttons */}
              <div className="result-actions-container">
                {/* Primary: Try Another Saree */}
                <button
                  type="button"
                  className="btn btn-primary result-btn primary-action-btn"
                  onClick={handleTryAnotherSaree}
                >
                  <RefreshCw size={15} />
                  <span>Try Another Saree</span>
                </button>

                {/* Secondary: Change Photograph */}
                <button
                  type="button"
                  className="btn btn-secondary result-btn secondary-action-btn"
                  onClick={handleChangePhotograph}
                >
                  <Camera size={15} />
                  <span>Change Photograph</span>
                </button>

                {/* Tertiary: Start New Session */}
                <button
                  type="button"
                  className="btn btn-ghost result-btn btn-start-session"
                  onClick={handleStartNewSession}
                >
                  <RotateCcw size={14} />
                  <span>Start New Session</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};
