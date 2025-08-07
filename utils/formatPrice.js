/**
 * Format price with Persian number format and currency
 * @param {number|string} price - The price to format
 * @returns {string} Formatted price with Persian formatting and "تومان" suffix
 */
export const formatPrice = (price) => {
  if (!price && price !== 0) {
    return '0 تومان';
  }
  
  // Convert to number if it's a string
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numPrice)) {
    return '0 تومان';
  }
  
  return new Intl.NumberFormat('fa-IR').format(numPrice) + ' تومان';
};

export default formatPrice;
