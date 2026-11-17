import React, { useRef, useState } from 'react';
import { Upload, RefreshCw, Grid, CheckCircle2, Camera } from 'lucide-react';

interface ImageUploadCardProps {
  stepBadge: string;
  stepTitle: string;
  subDescription: string;
  imageUrl?: string | null;
  onImageChange: (dataUrl: string, fileName?: string) => void;
  onClear?: () => void;
  isSaree?: boolean;
  onBrowseCollection?: () => void;
  onChangeClick?: () => void;
  sareeDetails?: {
    name: string;
    code: string;
    category: string;
    color?: string;
  };
  guidanceText?: string;
}

export const ImageUploadCard: React.FC<ImageUploadCardProps> = ({
  stepBadge,
  stepTitle,
  subDescription,
  imageUrl,
  onImageChange,
  isSaree = false,
  onBrowseCollection,
  onChangeClick,
  sareeDetails,
  guidanceText,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setImageError(false);
        onImageChange(result, file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleChange = () => {
    if (onChangeClick) {
      onChangeClick();
    } else {
      triggerUpload();
    }
  };

  return (
    <div
      className={`upload-panel-card ${isDragging ? 'is-drag-active' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Hidden native file input supporting mobile camera / gallery */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
          }
        }}
        aria-label={`Upload image for ${stepTitle}`}
      />

      {/* Header section with Compact Step & Subtitle */}
      <div className="panel-header">
        <div className="panel-step-row">
          <span className="panel-step-badge">{stepBadge}</span>
          <span className="panel-sub-desc">{subDescription}</span>
        </div>
      </div>

      {/* Main Image Stage with 3:4 portrait aspect ratio */}
      <div className="image-stage-frame">
        {imageUrl && !imageError ? (
          <div className="preview-container">
            <img
              src={imageUrl}
              alt={stepTitle}
              className={`preview-image ${!isSaree ? 'contain-customer' : 'contain-saree'}`}
              onError={() => setImageError(true)}
              loading="lazy"
            />
            <div className="preview-overlay">
              <span className="active-tag" title="Image selected">
                <CheckCircle2 size={11} />
                <span>Ready</span>
              </span>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="empty-stage-btn"
            onClick={handleChange}
            aria-label={`Choose image for ${stepTitle}`}
          >
            <div className="empty-icon-wrap">
              <Upload size={20} />
            </div>
            <span className="empty-title">Select Photo</span>
            <span className="empty-subtitle">Tap to choose</span>
          </button>
        )}
      </div>

      {/* Product or Guidance Meta Strip (Uniform height across both cards) */}
      <div className="panel-meta-strip">
        {isSaree && sareeDetails ? (
          <div className="saree-meta-block">
            <div className="saree-name-row">
              <h3 className="saree-meta-name">{sareeDetails.name}</h3>
            </div>
            <div className="saree-spec-row">
              <span className="saree-meta-code">{sareeDetails.code}</span>
              <span className="saree-meta-dot">•</span>
              <span className="saree-meta-cat">{sareeDetails.category}</span>
            </div>
          </div>
        ) : (
          <div className="customer-meta-block">
            <div className="customer-guidance-pill">
              <span className="guidance-dot" />
              <span className="guidance-text">{guidanceText || 'Full body · Front facing'}</span>
            </div>
            <span className="customer-status-note">
              {imageUrl ? 'Verified pose drape ready' : 'Requires standing posture'}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons Row (pinned to bottom via flex margin-top: auto) */}
      <div className="panel-actions-row">
        {imageUrl ? (
          <>
            <button
              type="button"
              className={`btn btn-secondary action-btn ${!isSaree || !onBrowseCollection ? 'full-btn' : ''}`}
              onClick={handleChange}
              title={isSaree ? 'Change Saree' : 'Change Photograph'}
            >
              <RefreshCw size={13} />
              <span>Change</span>
            </button>

            {isSaree && onBrowseCollection && (
              <button
                type="button"
                className="btn btn-secondary action-btn browse-btn"
                onClick={onBrowseCollection}
                title="Browse Showroom Saree Collection"
              >
                <Grid size={13} />
                <span>Browse</span>
              </button>
            )}
          </>
        ) : (
          <button
            type="button"
            className="btn btn-primary action-btn full-btn"
            onClick={handleChange}
            title={isSaree ? 'Select Saree' : 'Select Photograph'}
          >
            <Upload size={13} />
            <span>Select</span>
          </button>
        )}
      </div>
    </div>
  );
};
