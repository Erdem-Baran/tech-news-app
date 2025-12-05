export const truncateText = (text: string, maxLength: number = 100): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.slice(0, maxLength) + '...';
};

// Clean HTML tags (Reddit sometimes sends HTML entities)

export const decodeHtmlEntity = (str: string) => {
  return str.replace(/&#(\d+);/g, (_match, dec) => String.fromCharCode(dec));
};