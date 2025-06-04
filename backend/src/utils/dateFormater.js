export const formatDateIso = (isoDateStr) => {
  const date = new Date(isoDateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // hasil: YYYY-MM-DD (waktu lokal)
};

export const parseDateTime = (isoString) => {
  const dateObj = new Date(isoString);

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  return {
    tanggal: `${year}-${month}-${day}`,
    jamMenit: `${hours}:${minutes}`,
  };
};
