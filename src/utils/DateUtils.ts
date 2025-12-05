export const formatTimeAgo = (timestamp: number): string => {
  if (!timestamp) return '';
  
  const seconds = Math.floor((new Date().getTime() - timestamp) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " year ago";
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " month ago";
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " day ago";
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hour ago";
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minute ago";
  
  return "Just now";
};