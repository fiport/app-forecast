export const formatDateTime = (dateTime: string): string => {
  if (!dateTime) return '';

  const [datePart, timePart] = dateTime.split(' ');
  const [year, month, day] = datePart.split('-');
  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${timePart}`;

  return `${formattedDate} às ${formattedTime}`;
};
