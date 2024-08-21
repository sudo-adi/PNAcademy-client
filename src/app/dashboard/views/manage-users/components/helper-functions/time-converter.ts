export const formatDateInIST = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-GB', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'short',
    timeStyle: 'short',
    hour12: true
  });
};
