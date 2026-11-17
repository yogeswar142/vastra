import React, { createContext, useContext, useState, useEffect } from 'react';
import { SareeProduct, CustomerPhoto } from '../types';

export const SHOWROOM_COLLECTION: (SareeProduct & { shortName: string })[] = [
  {
    id: 'saree-tst1',
    name: 'Peacock Heritage Silk',
    shortName: 'KS-104 Teal',
    code: 'KS-104',
    category: 'Kanchipuram Silk',
    color: 'Peacock Teal',
    imageUrl: '/demo/saree-tst1.png',
    resultImageUrl: '/demo/output-tst1.png',
    description: 'Pure mulberry silk handwoven with authentic gold zari peacock border and intricate pallu work.',
    price: '₹ 48,500',
    isSample: true,
  },
  {
    id: 'saree-tst2',
    name: 'Royal Crimson Brocade',
    shortName: 'KP-208 Crimson',
    code: 'KP-208',
    category: 'Kanchipattu Silk',
    color: 'Muted Burgundy & Gold',
    imageUrl: '/demo/saree-tst2.png',
    resultImageUrl: '/demo/output-tst2.png',
    description: 'Regal Banarasi floral vines woven with antique zari and rich contrast korvai borders.',
    price: '₹ 56,000',
    isSample: true,
  },
  {
    id: 'saree-tst3',
    name: 'Emerald Heritage Zari',
    shortName: 'KS-305 Emerald',
    code: 'KS-305',
    category: 'Banarasi Brocade',
    color: 'Emerald & Antique Gold',
    imageUrl: '/demo/saree-tst3.png',
    resultImageUrl: '/demo/output-tst3.png',
    description: 'Intricate gold zari jaal weaving on pure handloom silk with authentic temple motifs.',
    price: '₹ 64,500',
    isSample: true,
  },
  {
    id: 'saree-tst4',
    name: 'Gadwal Temple Silk',
    shortName: 'GD-412 Gadwal',
    code: 'GD-412',
    category: 'Gadwal Silk',
    color: 'Golden Mustard & Maroon',
    imageUrl: '/demo/saree-tst4.png',
    resultImageUrl: '/demo/output-tst4.png',
    description: 'Handwoven pure cotton body with rich Kanchipuram silk zari border and pallu.',
    price: '₹ 42,000',
    isSample: true,
  },
  {
    id: 'saree-tst5',
    name: 'Royal Mayil Brocade',
    shortName: 'KP-520 Auburn',
    code: 'KP-520',
    category: 'Kanchipattu Silk',
    color: 'Deep Auburn & Teal',
    imageUrl: '/demo/saree-tst5.png',
    resultImageUrl: '/demo/output-tst5.png',
    description: 'Traditional Kanchipattu weave with embossed peacock buttas and heavy gold border.',
    price: '₹ 59,500',
    isSample: true,
  },
];

export const DEFAULT_CUSTOMER_PHOTO: CustomerPhoto = {
  imageUrl: '/demo/model-girl.png',
  fileName: 'studio-girl-model.png',
  isSample: true,
};

interface TryOnContextValue {
  isAuthenticated: boolean;
  pinError: string | null;
  credits: number;
  selectedSaree: (SareeProduct & { shortName?: string }) | null;
  customerPhoto: CustomerPhoto | null;
  resultImage: string | null;
  login: (pin: string) => boolean;
  logout: () => void;
  selectSaree: (saree: SareeProduct & { shortName?: string }) => void;
  setCustomSareeImage: (imageUrl: string, name?: string) => void;
  setCustomerPhotograph: (imageUrl: string, fileName?: string) => void;
  clearCustomerPhoto: () => void;
  clearSaree: () => void;
  setResult: (url: string) => void;
  resetSession: () => void;
  deductCredit: () => void;
}

const TryOnContext = createContext<TryOnContextValue | undefined>(undefined);

const DEMO_PIN = '482916';
const INITIAL_CREDITS = 650;

export const TryOnProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('vastra_auth') === 'true';
  });

  const [pinError, setPinError] = useState<string | null>(null);
  const [credits, setCredits] = useState<number>(() => {
    const saved = sessionStorage.getItem('vastra_credits');
    return saved ? parseInt(saved, 10) : INITIAL_CREDITS;
  });

  // Try-on inputs: default to Saree 1 (tst1) and Girl Model
  const [selectedSaree, setSelectedSaree] = useState<(SareeProduct & { shortName?: string }) | null>(() => {
    return SHOWROOM_COLLECTION[0];
  });

  const [customerPhoto, setCustomerPhoto] = useState<CustomerPhoto | null>(() => {
    return DEFAULT_CUSTOMER_PHOTO;
  });

  const [resultImage, setResultImage] = useState<string | null>(() => {
    return SHOWROOM_COLLECTION[0].resultImageUrl;
  });

  useEffect(() => {
    sessionStorage.setItem('vastra_auth', isAuthenticated ? 'true' : 'false');
    sessionStorage.setItem('vastra_credits', credits.toString());
  }, [isAuthenticated, credits]);

  const login = (pin: string): boolean => {
    if (pin.trim() === DEMO_PIN) {
      setIsAuthenticated(true);
      setPinError(null);
      return true;
    } else {
      setPinError('Invalid Showroom PIN. Please check your staff credentials.');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('vastra_auth');
    setPinError(null);
  };

  const selectSaree = (saree: SareeProduct & { shortName?: string }) => {
    setSelectedSaree(saree);
    setResultImage(saree.resultImageUrl);
  };

  const setCustomSareeImage = (imageUrl: string, name: string = 'Uploaded Custom Saree') => {
    const customProduct = {
      id: `custom-${Date.now()}`,
      name: name,
      shortName: 'Custom Saree',
      code: 'CUS-' + Math.floor(100 + Math.random() * 900),
      category: 'Custom Silk',
      color: 'Custom Drape',
      imageUrl: imageUrl,
      resultImageUrl: '/demo/output-tst1.png',
      isSample: false,
    };
    setSelectedSaree(customProduct);
    setResultImage(customProduct.resultImageUrl);
  };

  const setCustomerPhotograph = (imageUrl: string, fileName: string = 'Customer Photograph') => {
    setCustomerPhoto({
      imageUrl,
      fileName,
      isSample: false,
    });
  };

  const clearCustomerPhoto = () => {
    setCustomerPhoto(null);
  };

  const clearSaree = () => {
    setSelectedSaree(null);
  };

  const setResult = (url: string) => {
    setResultImage(url);
  };

  const deductCredit = () => {
    setCredits((prev) => Math.max(0, prev - 1));
  };

  const resetSession = () => {
    setSelectedSaree(SHOWROOM_COLLECTION[0]);
    setCustomerPhoto(DEFAULT_CUSTOMER_PHOTO);
    setResultImage(SHOWROOM_COLLECTION[0].resultImageUrl);
    setIsAuthenticated(false);
    sessionStorage.clear();
    setPinError(null);
  };

  return (
    <TryOnContext.Provider
      value={{
        isAuthenticated,
        pinError,
        credits,
        selectedSaree,
        customerPhoto,
        resultImage,
        login,
        logout,
        selectSaree,
        setCustomSareeImage,
        setCustomerPhotograph,
        clearCustomerPhoto,
        clearSaree,
        setResult,
        resetSession,
        deductCredit,
      }}
    >
      {children}
    </TryOnContext.Provider>
  );
};

export const useTryOn = (): TryOnContextValue => {
  const context = useContext(TryOnContext);
  if (!context) {
    throw new Error('useTryOn must be used within a TryOnProvider');
  }
  return context;
};
