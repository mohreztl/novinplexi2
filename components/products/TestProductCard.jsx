import React from 'react';

const TestProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="border rounded-lg p-4">
      <h3>{product.title || product.name || 'محصول'}</h3>
      <p>{product.basePrice || product.price || 0} تومان</p>
    </div>
  );
};

export default TestProductCard;
