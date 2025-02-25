export const formatData = (data) => {
  if (!data || data.length < 2) return {
    headers: [],
    formattedData: []
  };

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  // Convertir la fecha actual y de mañana a "DD/MM/YYYY"
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const todayStr = formatDate(today);
  const tomorrowStr = formatDate(tomorrow);

  const headers = data[0]; // Obtener encabezados

  // Transformar los datos en objetos con índice de fila original
  const formattedData = data.slice(1).map((row, index) => {
    const rowData = headers.reduce((obj, key, colIndex) => {
      obj[key] = row[colIndex] ?? null;
      return obj;
    }, {});

    return { ...rowData, rowIndex: index + 1 }; // Índice original de Google Sheets
  })
  .filter(row => {
    if (!row.FECHA || row.ESTADO?.toLowerCase() === "programada") return false;

    // Extraer la fecha en formato "DD/MM/YYYY"
    const [day, month, year] = row.FECHA.split("/");
    const formattedRowDate = `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;

    return formattedRowDate === todayStr || formattedRowDate === tomorrowStr;
  });

  return {
    headers,
    formattedData
  };
};