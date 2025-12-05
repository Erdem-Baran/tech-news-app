export const formatTimeAgo = (timestamp: number): string => {
  if (!timestamp) return '';
  
  const seconds = Math.floor((new Date().getTime() - timestamp) / 1000);

  const getUnit = (value: number, unit: string) => {
    const floored = Math.floor(value);
    return `${floored} ${unit}${floored > 1 ? 's' : ''} ago`;
  };

  let interval = seconds / 31536000;
  if (interval > 1) return getUnit(interval, "year");
  
  interval = seconds / 2592000;
  if (interval > 1) return getUnit(interval, "month");
  
  interval = seconds / 86400;
  if (interval > 1) return getUnit(interval, "day");
  
  interval = seconds / 3600;
  if (interval > 1) return getUnit(interval, "hour");
  
  interval = seconds / 60;
  if (interval > 1) return getUnit(interval, "minute");
  
  return "Just now";
};