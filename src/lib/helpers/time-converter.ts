export const formatDateInIST = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-GB', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'short',
    timeStyle: 'short',
    hour12: true
  }).toLocaleUpperCase();
};


export const millisecondsToMinutes = (milliseconds: number) => {
  return Math.floor(milliseconds / 60000);
}

