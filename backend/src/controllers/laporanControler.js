import {
  postRincianDana as postDana,
  getRincianDana as getDana,
  patchRincianDana as patchDana,
  deleteRincianDana as deleteDana,
  postLaporan as postLapor,
  patchLaporan as patchLapor,
  getLaporan as getLapor,
} from "../model/laporModel.js";
import { customQuery } from "../model/model.js";
import { saveNotif } from "../model/notifModel.js";
import { getTugasByid } from "../model/tugasLuarModel.js";
import { getAllUsersBYIdTugas } from "../model/userModel.js";
import { connectedUsers, io } from "../socket.js";
import { formatDateIso } from "../utils/dateFormater.js";
import { getFoto } from "../model/uploadModel.js";

export const getLaporan = async (req, res) => {
  const id = req.params.id;
  try {
    const dataTugas = await customQuery(
      "Select judul_tugas, lokasi FROM  tb_tugas_luar WHERE id_tugas_luar = ? ",
      id
    );
    const dataLaporan = await getLapor(id);
    const formattedLaporan = dataLaporan.map((value) => ({
      ...value,
      Tanggal_dibuat: formatDateIso(value.Tanggal_dibuat),
    }));
    const data = { dataTugas: [dataTugas], dataLaporan: formattedLaporan };
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

    if (socketId) {
      io.to(socketId).emit("notification", {
        message: message,
      });
    }
    io.emit("verification", {
      message: "status tugas berubah",
    });
    // Kirim respon sukses
    res.status(200).json({ message: "Data laporan berhasil ditambahkan." });
  } catch (error) {
    console.error("Gagal menambahkan laporan :", error.message);
    res.status(500).json({
      message: "Terjadi kesalahan pada server. Silakan coba lagi nanti.",
    });
  }
};

export const patchLaporan = async (req, res) => {
  try {
    const { id_laporan, materi, laporan, bagian } = req.body;

    if (!id_laporan) {
      return res.status(400).json({
        message: "Data tidak lengkap. Harap isi semua field yang dibutuhkan.",
      });
    }

    await patchLapor(id_laporan, laporan, bagian, materi);

    // Kirim respon sukses
    res.status(200).json({ message: "Data laporan berhasil diubah." });
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
    console.log("asssssss+++++++=====");

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

export const patcRincianDana = async (req, res) => {
  try {
    const { id_rincian_dana, deskripsi, jumlah } = req.body;

    // Validasi input dasar
    if (!id_rincian_dana || !deskripsi || jumlah == null) {
      return res.status(400).json({
        message: "Data tidak lengkap. Harap isi semua field yang dibutuhkan.",
      });
    }

    // Panggil fungsi penyimpanan
    await patchDana(id_rincian_dana, deskripsi, jumlah);

    // Kirim respon sukses
    res.status(200).json({ message: "Data rincian dana berhasil diubah." });
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

export const laporPdf = async (req, res) => {
  const id = req.params.id;
  const DOMAIN = process.env.DOMAIN || "localhost";
  const PORT = process.env.PORT;
  try {
    const rincianDana = await getDana(id);
    const tugas = await getTugasByid(
      "judul_tugas,dasar,lokasi,tanggal_mulai",
      id
    );
    const users = await getAllUsersBYIdTugas(id);
    const laporan = await getLapor(id);
    const foto = await getFoto(id);

    const tugasFormatted = tugas.map((value) => ({
      ...value,
      tanggal_mulai: formatDateIso(value.tanggal_mulai),
    }));

    const laporanFormatted = laporan.map((value) => ({
      ...value,
      Tanggal_dibuat: formatDateIso(value.Tanggal_dibuat),
    }));

    const fotoFormatted = foto.map((data) => ({
      ...data,
      file_url: `http://${DOMAIN}:${PORT}/public/uploads/img/${data.file_url}`,
    }));

    const hasil = {
      tugas: tugasFormatted,
      rincianDana,
      users,
      laporan: laporanFormatted,
      foto: fotoFormatted,
    };
    return res.status(200).json({ massage: "success", data: hasil });
  } catch (error) {
    console.error(" Error in laporPdf:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data laporan.",
      error: error.message,
    });
  }
};

export const approveLaporan = async (req, res) => {
  const id = req.params.id;

  try {
    await customQuery(
      "UPDATE `tb_tugas_luar` SET `status_approval` = 'archived' WHERE `id_tugas_luar` = ?;",
      [id] // Gunakan array jika pakai query prepared statement
    );

    res.status(200).json({
      message: "Laporan berhasil di-approve dan diarsipkan",
      id: id,
    });
  } catch (error) {
    console.error("Error saat meng-approve laporan:", error.message);
    res.status(500).json({
      message: "Terjadi kesalahan saat meng-approve laporan",
      error: error.message,
    });
  }
};
