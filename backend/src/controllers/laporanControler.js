import {
  postRincianDana as postDana,
  getRincianDana as getDana,
  deleteRincianDana as deleteDana,
} from "../model/laporModel.js";

export const getRincianDana = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await getDana(id);
    res.status(200).json({ massage: "fetch data success", data: data });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: " Internal Server Error, please try again later." });
  }
};

export const postRincianDana = async (req, res) => {
  try {
    const { idTugas, deskripsi, jumlah } = req.body;

    // Validasi input dasar
    if (!idTugas || !deskripsi || jumlah == null) {
      return res.status(400).json({
        message: "Data tidak lengkap. Harap isi semua field yang dibutuhkan.",
      });
    }

    // Panggil fungsi penyimpanan
    await postDana(idTugas, deskripsi, jumlah);

    // Kirim respon sukses
    res
      .status(200)
      .json({ message: "Data rincian dana berhasil ditambahkan." });
  } catch (error) {
    console.error("Gagal menambahkan rincian dana:", error.message);
    res.status(500).json({
      message: "Terjadi kesalahan pada server. Silakan coba lagi nanti.",
    });
  }
};

export const deleteRincianDana = async (req, res) => {
  const { idTugas, idRincian } = req.body;

  if (!idTugas || !idRincian) {
    return res.status(400).json({
      message: "idTugas dan idRincian wajib diisi.",
    });
  }

  try {
    await deleteDana(idTugas, idRincian);
    res.status(200).json({ message: "Data rincian berhasil dihapus." });
  } catch (error) {
    console.error("Gagal menghapus rincian dana:", error.message);
    res.status(500).json({
      message: "Terjadi kesalahan pada server. Silakan coba lagi nanti.",
    });
  }
};
