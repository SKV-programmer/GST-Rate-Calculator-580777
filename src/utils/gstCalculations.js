// Utility functions for GST calculations

/**
 * Calculate GST for amount where GST is not included (exclusive)
 * @param {number} amount - Base amount without GST
 * @param {number} rate - GST rate percentage
 * @returns {Object} Calculation results
 */
export const calculateExclusiveGST = (amount, rate) => {
  const gstAmount = amount * (rate / 100);
  const totalAmount = amount + gstAmount;

  return {
    originalAmount: Number(amount.toFixed(2)),
    gstAmount: Number(gstAmount.toFixed(2)),
    totalAmount: Number(totalAmount.toFixed(2)),
    rate
  };
};

/**
 * Calculate GST for amount where GST is already included (inclusive)
 * @param {number} amount - Total amount including GST
 * @param {number} rate - GST rate percentage
 * @returns {Object} Calculation results
 */
export const calculateInclusiveGST = (amount, rate) => {
  const originalAmount = amount / (1 + rate / 100);
  const gstAmount = amount - originalAmount;

  return {
    originalAmount: Number(originalAmount.toFixed(2)),
    gstAmount: Number(gstAmount.toFixed(2)),
    totalAmount: Number(amount.toFixed(2)),
    rate
  };
};

/**
 * Validate GST rate
 * @param {number} rate - GST rate to validate
 * @returns {boolean} Whether rate is valid
 */
export const isValidGSTRate = (rate) => {
  return !isNaN(rate) && rate >= 0 && rate <= 100;
};

/**
 * Format currency amount
 * @param {number} amount - Amount to format
 * @returns {string} Formatted amount
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Get common GST rates
 * @returns {Array<number>} Array of common GST rates
 */
export const getCommonGSTRates = () => {
  return [5, 12, 18, 28];
};