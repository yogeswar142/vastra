import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { TryOnProvider, useTryOn } from './context/TryOnContext';
import { Login } from './pages/Login';
import { Atelier } from './pages/Atelier';
import { Result } from './pages/Result';
import { AnimatePresence } from 'framer-motion';
import './styles/global.css';

// Protected Route Guard for Showroom Staff
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useTryOn();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const AnimatedAppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        <Route
          path="/atelier"
          element={
            <ProtectedRoute>
              <Atelier />
            </ProtectedRoute>
          }
        />
        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />
        {/* Default route redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  return (
    <TryOnProvider>
      <BrowserRouter>
        <AnimatedAppRoutes />
      </BrowserRouter>
    </TryOnProvider>
  );
};

export default App;
