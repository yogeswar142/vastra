import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTryOn } from '../context/TryOnContext';
import { LogOut, ShieldCheck } from 'lucide-react';
import '../styles/navbar.css';

interface NavbarProps {
  showLogout?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ showLogout = true }) => {
  const { credits, logout } = useTryOn();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/atelier" className="navbar-brand" aria-label="VASTRA Atelier Home">
          <div className="brand-titles">
            <span className="brand-wordmark">
              VAST<span>R</span>A
            </span>
            <span className="brand-subtitle">VIRTUAL DRAPING STUDIO</span>
          </div>
        </Link>

        <div className="navbar-right">
          {/* Desktop Terminal Badge */}
          <div className="staff-badge desktop-only" title="Showroom Staff Access Activated">
            <span className="status-dot" />
            <ShieldCheck size={13} />
            <span>Showroom Terminal</span>
          </div>

          {/* Credits indicator as small pill */}
          <div className="credits-indicator" title="Available Demo Credits">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginRight: 2 }}>
              <path d="M5 1L9 5L5 9L1 5Z" fill="var(--color-antique-gold)" />
            </svg>
            <span className="credits-label desktop-only">Credits:</span>
            <span className="credits-value">{credits}</span>
          </div>

          {showLogout && (
            <button
              type="button"
              className="logout-btn"
              onClick={handleLogout}
              title="End Showroom Session"
              aria-label="Exit Session"
            >
              <LogOut size={14} />
              <span className="logout-text">Exit</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
