import { googleAuth } from "./auth.js";
import { google } from "googleapis";

export const getSheets = async ({spreadsheetId, range}) => {
    const auth = await googleAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({ spreadsheetId, range });
    return response.data.values;
}

export const updateSheet = async ({ spreadsheetId, data }) => {
  const auth = await googleAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const request = {
    range: `Smart!E${data.rowIndex + 1}`, // Ajusta a índice basado en 1
    values: [["Programada"]], // Nuevo valor para la columna ESTADO
  };

  const batchUpdateRequest = {
    data: [request], // Debe ser un array
    valueInputOption: "RAW",
  };

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId,
    resource: batchUpdateRequest,
  });

  console.log("Estado actualizado correctamente en Google Sheets.");
};
  