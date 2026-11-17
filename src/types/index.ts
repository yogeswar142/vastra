export interface SareeProduct {
  id: string;
  name: string;
  code: string;
  category: string;
  color: string;
  imageUrl: string;
  resultImageUrl: string;
  description?: string;
  price?: string;
  isSample?: boolean;
}

export interface CustomerPhoto {
  imageUrl: string;
  fileName?: string;
  isSample?: boolean;
}

export interface TryOnState {
  isAuthenticated: boolean;
  selectedSaree: SareeProduct | null;
  customerPhoto: CustomerPhoto | null;
  resultImage: string | null;
  credits: number;
}
