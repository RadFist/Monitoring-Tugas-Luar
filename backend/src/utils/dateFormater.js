export const formatDateIso = (isoDateStr) => {
  const date = new Date(isoDateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // hasil: YYYY-MM-DD (waktu lokal)
};
