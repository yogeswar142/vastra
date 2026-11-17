import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import '../styles/generationLoader.css';

interface GenerationLoaderProps {
  onComplete: () => void;
  durationMs?: number;
}

const STAGES = [
  { id: 1, title: 'Preparing your photograph' },
  { id: 2, title: 'Studying the saree details' },
  { id: 3, title: 'Arranging the drape' },
  { id: 4, title: 'Finishing your preview' },
];

export const GenerationLoader: React.FC<GenerationLoaderProps> = ({
  onComplete,
  durationMs = 3600,
}) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(10);

  useEffect(() => {
    const stageDuration = durationMs / STAGES.length;

    const stageTimer = setInterval(() => {
      setCurrentStageIndex((prev) => {
        if (prev < STAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, stageDuration);

    const progressTimer = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return Math.min(100, prev + 2);
      });
    }, durationMs / 50);

    const finishTimeout = setTimeout(() => {
      onComplete();
    }, durationMs + 200);

    return () => {
      clearInterval(stageTimer);
      clearInterval(progressTimer);
      clearTimeout(finishTimeout);
    };
  }, [durationMs, onComplete]);

  return (
    <div className="loader-backdrop" role="dialog" aria-modal="true" aria-label="Weaving your new look">
      {/* Background silk grain ambiance */}
      <div className="loader-ambient-glow" />

      <motion.div
        className="loader-card"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Antique Gold Animated Circular Linework & Zari Mandala */}
        <div className="zari-circle-container">
          {/* Outer rotating intricate geometric ring */}
          <motion.svg
            className="zari-svg-outer"
            viewBox="0 0 200 200"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
          >
            <circle
              cx="100"
              cy="100"
              r="92"
              fill="none"
              stroke="var(--color-antique-gold)"
              strokeWidth="0.75"
              strokeDasharray="4 6"
              opacity="0.6"
            />
            <circle
              cx="100"
              cy="100"
              r="84"
              fill="none"
              stroke="var(--color-antique-gold-light)"
              strokeWidth="1.2"
              strokeDasharray="16 12"
              opacity="0.85"
            />
            {/* 12 Traditional Sunburst/Pallu Rays */}
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="8"
                x2="100"
                y2="16"
                stroke="var(--color-antique-gold)"
                strokeWidth="1"
                transform={`rotate(${i * 30} 100 100)`}
                opacity="0.7"
              />
            ))}
          </motion.svg>

          {/* Inner Counter-rotating Weave Ring */}
          <motion.svg
            className="zari-svg-inner"
            viewBox="0 0 160 160"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
          >
            <circle
              cx="80"
              cy="80"
              r="68"
              fill="none"
              stroke="var(--color-silk-beige)"
              strokeWidth="0.8"
              strokeDasharray="2 4"
              opacity="0.5"
            />
            <circle
              cx="80"
              cy="80"
              r="58"
              fill="none"
              stroke="var(--color-antique-gold)"
              strokeWidth="1.5"
              strokeDasharray="30 20 10 20"
              opacity="0.9"
            />
          </motion.svg>

          {/* Center Pulsing Heritage Lotus Motif (Traditional Indian Saree Zari Symbol) */}
          <motion.div
            className="zari-center-emblem"
            animate={{
              scale: [1, 1.07, 1],
              opacity: [0.9, 1, 0.9],
            }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            title="Heritage Saree Zari Lotus Motif"
          >
            <svg
              viewBox="0 0 36 36"
              width="30"
              height="30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="zari-heritage-symbol"
              aria-label="Heritage Lotus Motif"
            >
              <defs>
                <linearGradient id="heritageLotusGold" x1="18" y1="4" x2="18" y2="30" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFF8E7" />
                  <stop offset="45%" stopColor="#DFC48E" />
                  <stop offset="100%" stopColor="#B58A45" />
                </linearGradient>
              </defs>

              {/* Central vertical lotus petal */}
              <path
                d="M18 5 C16.8 11.5 15.2 16.5 18 24.5 C20.8 16.5 19.2 11.5 18 5 Z"
                fill="url(#heritageLotusGold)"
                stroke="#DFC48E"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />

              {/* Left inner petal */}
              <path
                d="M18 12.5 C13.5 15 10.5 19.5 13 25 C15.5 25 17.2 21.5 18 19"
                fill="url(#heritageLotusGold)"
                fillOpacity="0.85"
                stroke="#DFC48E"
                strokeWidth="0.75"
                strokeLinejoin="round"
              />

              {/* Right inner petal */}
              <path
                d="M18 12.5 C22.5 15 25.5 19.5 23 25 C20.5 25 18.8 21.5 18 19"
                fill="url(#heritageLotusGold)"
                fillOpacity="0.85"
                stroke="#DFC48E"
                strokeWidth="0.75"
                strokeLinejoin="round"
              />

              {/* Left outer flare petal */}
              <path
                d="M13.5 18.5 C7.5 20.5 5 24 7.5 28 C10.8 28.5 14 26 15.5 23.5"
                stroke="#B58A45"
                strokeWidth="0.85"
                strokeLinecap="round"
              />

              {/* Right outer flare petal */}
              <path
                d="M22.5 18.5 C28.5 20.5 31 24 28.5 28 C25.2 28.5 22 26 20.5 23.5"
                stroke="#B58A45"
                strokeWidth="0.85"
                strokeLinecap="round"
              />

              {/* Bottom decorative calyx base */}
              <path
                d="M12.5 27 C15.5 29.5 20.5 29.5 23.5 27 C21 31.5 15 31.5 12.5 27 Z"
                fill="#B58A45"
                stroke="#DFC48E"
                strokeWidth="0.5"
              />

              {/* Auspicious Peacock Teal & Gold Center Gem (Bindu) */}
              <circle
                cx="18"
                cy="19"
                r="1.8"
                fill="var(--color-peacock-teal)"
                stroke="#DFC48E"
                strokeWidth="0.65"
              />
            </svg>
          </motion.div>
        </div>

        {/* Headlines */}
        <div className="loader-headings">
          <span className="eyebrow loader-eyebrow">Digital Draping Atelier</span>
          <h2 className="loader-title">Weaving your new look...</h2>
          <p className="loader-subtitle">
            Bringing the elegance of traditional silk draping to your photograph.
          </p>
        </div>

        {/* Progress Bar with Antique Gold Fill */}
        <div className="progress-track" aria-hidden="true">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Animated Progress Stages */}
        <div className="stages-list">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            const isPending = idx > currentStageIndex;

            return (
              <div
                key={stage.id}
                className={`stage-item ${
                  isCompleted ? 'is-completed' : isCurrent ? 'is-current' : 'is-pending'
                }`}
              >
                <div className="stage-marker">
                  {isCompleted ? (
                    <Check size={12} className="check-icon" />
                  ) : (
                    <span className="stage-num">{idx + 1}</span>
                  )}
                </div>
                <span className="stage-text">{stage.title}</span>
                {isCurrent && (
                  <motion.div
                    className="stage-pulse-dot"
                    animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Quiet assurance label */}
        <p className="loader-footer-note">
          Simulating artisanal drape alignment for showroom preview
        </p>
      </motion.div>
    </div>
  );
};
