import React from 'react';
import { SareeProduct } from '../types';
import { Sparkles, Tag, Layers, Palette } from 'lucide-react';

interface ProductDetailsProps {
  product: SareeProduct;
  onBrowseCollection?: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onBrowseCollection,
}) => {
  return (
    <div className="product-details-card">
      <div className="product-details-header">
        <div>
          <span className="product-code-badge">
            <Tag size={12} />
            {product.code}
          </span>
          <h3 className="product-name">{product.name}</h3>
        </div>
        {product.isSample && (
          <span className="sample-badge">
            <Sparkles size={11} />
            Sample Product
          </span>
        )}
      </div>

      <div className="product-meta-grid">
        <div className="product-meta-item">
          <span className="meta-label">
            <Layers size={13} />
            Category
          </span>
          <span className="meta-value">{product.category}</span>
        </div>

        <div className="product-meta-item">
          <span className="meta-label">
            <Palette size={13} />
            Colour
          </span>
          <span className="meta-value">{product.color}</span>
        </div>
      </div>

      {product.description && (
        <p className="product-description">{product.description}</p>
      )}

      {onBrowseCollection && (
        <button
          type="button"
          onClick={onBrowseCollection}
          className="browse-collection-link"
        >
          <span>Browse Atelier Collection</span>
          <span className="arrow-icon">→</span>
        </button>
      )}
    </div>
  );
};
