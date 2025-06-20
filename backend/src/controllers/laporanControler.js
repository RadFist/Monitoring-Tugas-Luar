import {
  postRincianDana as postDana,
  getRincianDana as getDana,
  deleteRincianDana as deleteDana,
  postLaporan as postLapor,
  getLaporan as getLapor,
} from "../model/laporModel.js";
import { customQuery } from "../model/model.js";
import { saveNotif } from "../model/notifModel.js";
import { connectedUsers, io } from "../socket.js";

export const getLaporan = async (req, res) => {
  const id = req.params.id;
  try {
    const dataTugas = await customQuery(
      "Select judul_tugas, lokasi FROM  tb_tugas_luar WHERE id_tugas_luar = ? ",
      id
    );
    const dataLaporan = await getLapor(id);
    const data = { dataTugas: [dataTugas], dataLaporan: dataLaporan };
    res.status(200).json({ massage: "fetch data success", data: data });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: " Internal Server Error, please try again later." });
  }
};

export const postLaporan = async (req, res) => {
  try {
    const { idTugas, materi, laporan, bagian, judul_tugas } = req.body;

    if (!idTugas) {
      return res.status(400).json({
        message: "Data tidak lengkap. Harap isi semua field yang dibutuhkan.",
      });
    }

    await postLapor(idTugas, laporan, bagian, materi);

    const camatId = (
      await customQuery(
        "SELECT id_user FROM `tb_user` WHERE level = ?",
        "camat"
      )
    ).id_user;

    const message = `laporan ${judul_tugas} sudah dikirim`;
    await saveNotif(camatId, message);
    const socketId = connectedUsers.get(camatId);
    console.log(socketId);

    if (socketId) {
      io.to(socketId).emit("notification", {
        message: message,
      });
    }

    // Kirim respon sukses
    res.status(200).json({ message: "Data laporan berhasil ditambahkan." });
  } catch (error) {
    console.error("Gagal menambahkan laporan :", error.message);
    res.status(500).json({
      message: "Terjadi kesalahan pada server. Silakan coba lagi nanti.",
    });
  }
};

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
