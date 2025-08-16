export const formatDateOnly = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatTanggalBulan = (tanggal, dash = true) => {
  if (!tanggal) return "tanggal kosong";

  const bulanIndo = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const [tahun, bulan, hari] = tanggal.split("-");
  if (dash) {
    return `${hari}-${bulanIndo[parseInt(bulan) - 1]}-${tahun}`;
  } else {
    return `${hari} ${bulanIndo[parseInt(bulan) - 1]} ${tahun}`;
  }
};

export const formatTanggalIndo = (tanggal) => {
  const bulanIndo = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const dateObj = new Date(tanggal);
  const tanggalNum = dateObj.getDate();
  const bulan = bulanIndo[dateObj.getMonth()];
  const tahun = dateObj.getFullYear();

  return `${tanggalNum} ${bulan} ${tahun}`;
};

export const hitungLamaTugas = (mulai, selesai) => {
  const start = new Date(mulai);
  const end = new Date(selesai);
  const diffTime = end - start;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return `${diffDays} hari`;
};
