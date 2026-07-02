/**
 * Format an ISO date string to a readable format
 * @param {string} dateStr
 * @returns {string}
 */
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Generate a unique ID
 * @param {string} prefix
 * @returns {string}
 */
export const generateId = (prefix = 'id') => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get initials from a full name
 * @param {string} name
 * @returns {string}
 */
export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Trigger browser print for PDF download or download blob
 * @param {Blob|null} blob
 * @param {string} filename
 */
export const downloadPDF = (blob = null, filename = 'document.pdf') => {
  if (blob) {
    const pdfBlob = new Blob([blob], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(url), 1000);
  } else {
    window.print();
  }
};

/**
 * Truncate text to a max length
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Simulate an async operation with a delay
 * @param {number} ms
 * @returns {Promise<void>}
 */
export const delay = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));
