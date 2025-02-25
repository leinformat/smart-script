export const formatDate = (dateString) => {
  const [day, month, year] = dateString.split("/");
  const shortYear = year.slice(-2); // Tomar los últimos 2 dígitos del año
  return `${day}/${month}/${shortYear}`;
};
