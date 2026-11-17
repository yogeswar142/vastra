import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTryOn, SHOWROOM_COLLECTION, DEFAULT_CUSTOMER_PHOTO } from '../context/TryOnContext';
import { Navbar } from '../components/Navbar';
import { ImageUploadCard } from '../components/ImageUploadCard';
import { ArrowRight, X, Check, Plus, Camera, Images } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/atelier.css';

export const Atelier: React.FC = () => {
  const navigate = useNavigate();
  const {
    selectedSaree,
    customerPhoto,
    selectSaree,
    setCustomSareeImage,
    setCustomerPhotograph,
    clearCustomerPhoto,
    clearSaree,
    deductCredit,
  } = useTryOn();

  const [isSareeModalOpen, setIsSareeModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const customSareeFileInputRef = useRef<HTMLInputElement>(null);
  const customCustomerFileInputRef = useRef<HTMLInputElement>(null);

  const canGenerate = Boolean(selectedSaree?.imageUrl && customerPhoto?.imageUrl);

  const handleGenerateClick = () => {
    if (!canGenerate || isGenerating) return;
    setIsGenerating(true);
    deductCredit();
    navigate('/result');
  };

  const handleCustomSareeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomSareeImage(event.target.result as string, file.name);
          setIsSareeModalOpen(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCustomCustomerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomerPhotograph(event.target.result as string, file.name);
          setIsCustomerModalOpen(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="atelier-page">
      <Navbar />

      {/* Hidden file pickers for direct custom uploads from modal */}
      <input
        ref={customSareeFileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleCustomSareeUpload}
      />
      <input
        ref={customCustomerFileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleCustomCustomerUpload}
      />

      <main className="atelier-main">
        <div className="container">
          {/* Main Editorial Header */}
          <header className="atelier-header">
            <span className="eyebrow">THE DIGITAL DRAPING ROOM</span>
            <h1 className="atelier-headline">Your next drape awaits.</h1>
            <p className="atelier-subtitle">
              See how your favourite sarees look on you.
            </p>
          </header>

          {/* MAIN IMAGE WORKSPACE — SIDE BY SIDE (2-Column Grid on Mobile >= 360px) */}
          <section
            className="workspace-grid"
            aria-label="Two-column side-by-side saree and customer selection"
          >
            {/* LEFT CARD: 01 · SAREE */}
            <ImageUploadCard
              stepBadge="01 · SAREE"
              stepTitle="01 · SAREE"
              subDescription="SELECT YOUR SAREE"
              imageUrl={selectedSaree?.imageUrl}
              onImageChange={(dataUrl, fileName) => setCustomSareeImage(dataUrl, fileName)}
              onClear={clearSaree}
              isSaree={true}
              onChangeClick={() => setIsSareeModalOpen(true)}
              onBrowseCollection={() => setIsSareeModalOpen(true)}
              sareeDetails={
                selectedSaree
                  ? {
                      name: selectedSaree.name,
                      code: selectedSaree.code,
                      category: selectedSaree.category,
                      color: selectedSaree.color,
                    }
                  : undefined
              }
            />

            {/* RIGHT CARD: 02 · YOU */}
            <ImageUploadCard
              stepBadge="02 · YOU"
              stepTitle="02 · YOU"
              subDescription="YOUR PHOTOGRAPH"
              imageUrl={customerPhoto?.imageUrl}
              onImageChange={(dataUrl, fileName) => setCustomerPhotograph(dataUrl, fileName)}
              onClear={clearCustomerPhoto}
              isSaree={false}
              onChangeClick={() => setIsCustomerModalOpen(true)}
              guidanceText="Full body · Front facing"
            />
          </section>

          {/* GENERATION ACTION: Full-width directly below cards */}
          <section className="generation-action-box">
            <button
              type="button"
              className="btn btn-primary generate-cta-btn"
              onClick={handleGenerateClick}
              disabled={!canGenerate || isGenerating}
              aria-label="Create My Saree Look"
            >
              <span>{isGenerating ? 'Weaving Look...' : 'Create My Saree Look'}</span>
              <ArrowRight size={17} />
            </button>

            <p className="generate-timing-note">
              Your virtual preview will be ready in moments.
            </p>
            <p className="generate-privacy-note">
              Your photograph is used for your virtual preview.
            </p>
          </section>
        </div>
      </main>

      {/* 
        ======================================================================
        SAREE GALLERY BOTTOM SHEET (2x2 Rows/Columns Square Grid like Photos)
        ======================================================================
      */}
      <AnimatePresence>
        {isSareeModalOpen && (
          <motion.div
            className="gallery-sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSareeModalOpen(false)}
          >
            <motion.div
              className="gallery-sheet-content"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sheet Drag Handle Pill */}
              <div className="sheet-drag-handle" />

              {/* Sheet Header */}
              <div className="sheet-header">
                <div className="sheet-title-group">
                  <div className="sheet-pill-badge">
                    <Images size={12} />
                    <span>Showroom Gallery</span>
                  </div>
                  <h3 className="sheet-title">Select Saree Drape</h3>
                </div>
                <button
                  type="button"
                  className="sheet-close-btn"
                  onClick={() => setIsSareeModalOpen(false)}
                  aria-label="Close sheet"
                >
                  <X size={20} />
                </button>
              </div>

              {/* 2x2 Square Grid with small bold names on left bottom corner */}
              <div className="gallery-2x2-grid">
                {SHOWROOM_COLLECTION.map((saree) => {
                  const isSelected = selectedSaree?.id === saree.id;
                  return (
                    <div
                      key={saree.id}
                      className={`gallery-square-item ${isSelected ? 'is-active' : ''}`}
                      onClick={() => {
                        selectSaree(saree);
                        setIsSareeModalOpen(false);
                      }}
                    >
                      <img
                        src={saree.imageUrl}
                        alt={saree.name}
                        className="gallery-square-img"
                        loading="lazy"
                      />

                      {/* Small lookable bold label on left bottom corner */}
                      <div className="corner-tag-pill">
                        <span>{saree.shortName || saree.code}</span>
                      </div>

                      {/* Selected checkmark pill on top right */}
                      {isSelected && (
                        <div className="corner-selected-badge">
                          <Check size={12} />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Empty Upload Slot to complete the 2x2 row balance */}
                <div
                  className="gallery-square-item empty-upload-slot"
                  onClick={() => customSareeFileInputRef.current?.click()}
                  title="Upload another saree from device"
                >
                  <div className="empty-slot-content">
                    <Plus size={24} className="plus-icon" />
                    <span className="empty-slot-title">Upload Saree</span>
                    <span className="empty-slot-sub">from gallery</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        ======================================================================
        CUSTOMER PHOTOGRAPH GALLERY BOTTOM SHEET (2x2 Square Grid)
        ======================================================================
      */}
      <AnimatePresence>
        {isCustomerModalOpen && (
          <motion.div
            className="gallery-sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCustomerModalOpen(false)}
          >
            <motion.div
              className="gallery-sheet-content"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sheet Drag Handle Pill */}
              <div className="sheet-drag-handle" />

              {/* Sheet Header */}
              <div className="sheet-header">
                <div className="sheet-title-group">
                  <div className="sheet-pill-badge">
                    <Camera size={12} />
                    <span>Portrait Gallery</span>
                  </div>
                  <h3 className="sheet-title">Select Customer Photo</h3>
                </div>
                <button
                  type="button"
                  className="sheet-close-btn"
                  onClick={() => setIsCustomerModalOpen(false)}
                  aria-label="Close sheet"
                >
                  <X size={20} />
                </button>
              </div>

              {/* 2x2 Square Grid: Studio Girl Model + Empty Upload Slot */}
              <div className="gallery-2x2-grid">
                {/* 1. Verified Studio Girl Model */}
                <div
                  className={`gallery-square-item ${customerPhoto?.isSample ? 'is-active' : ''}`}
                  onClick={() => {
                    setCustomerPhotograph(DEFAULT_CUSTOMER_PHOTO.imageUrl, DEFAULT_CUSTOMER_PHOTO.fileName);
                    setIsCustomerModalOpen(false);
                  }}
                >
                  <img
                    src={DEFAULT_CUSTOMER_PHOTO.imageUrl}
                    alt="Verified Studio Girl Model"
                    className="gallery-square-img contain-model-img"
                    loading="lazy"
                  />

                  {/* Small bold lookable tag on left bottom corner */}
                  <div className="corner-tag-pill">
                    <span>Studio Girl</span>
                  </div>

                  {customerPhoto?.isSample && (
                    <div className="corner-selected-badge">
                      <Check size={12} />
                    </div>
                  )}
                </div>

                {/* 2. Empty Upload / Camera Slot */}
                <div
                  className="gallery-square-item empty-upload-slot"
                  onClick={() => customCustomerFileInputRef.current?.click()}
                  title="Take photo or upload from phone gallery"
                >
                  <div className="empty-slot-content">
                    <Camera size={24} className="plus-icon" />
                    <span className="empty-slot-title">Upload / Camera</span>
                    <span className="empty-slot-sub">from gallery</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
