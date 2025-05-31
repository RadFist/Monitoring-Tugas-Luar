import { v4 as uuidv4 } from "uuid";
import { postTugas } from "../model/tugasLuarModel.js";

export const inputPenugasan = async (req, res) => {
  console.log(req.body);
  const tugasId = uuidv4();
  const {
    namaTugas,
    lokasi,
    deskripsi,
    tanggalMulai,
    tanggalSelesai,
    daftarPegawai,
  } = req.body;

  try {
    await postTugas(
      tugasId,
      namaTugas,
      lokasi,
      deskripsi,
      tanggalMulai,
      tanggalSelesai,
      daftarPegawai
    );
    res.status(200).json({ response: "oke" });
  } catch (error) {
    console.error("Gagal input penugasan:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat menyimpan penugasan" });
  }
};
