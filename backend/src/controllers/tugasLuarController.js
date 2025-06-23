import { v4 as uuidv4 } from "uuid";
import {
  postTugas,
  getListTugas,
  getDetailTugas,
  updateStatusApproveTugas,
  getListTugasWithUser,
  getListTugasGrupTime,
} from "../model/tugasLuarModel.js";
import { schemaPneguasan } from "../utils/schemaJoi.js";
import {
  formatDateIso,
  formatDateOnly,
  formatTanggalIndo,
  parseDateTime,
} from "../utils/dateFormater.js";
import { getAllUsersBYIdTugas } from "../model/userModel.js";
import { saveNotif } from "../model/notifModel.js";
import { connectedUsers, io } from "../socket.js";

export const inputPenugasan = async (req, res) => {
  const data = req.body; //ngambil data dari body request
  const { value, error } = schemaPneguasan.validate(data); //validasi skema joi yang diambil dari import
  if (error) {
    return res.status(400).json({ message: error.details[0].message }); // return status 404 jika tidak ada di schema
  }

  const tugasId = uuidv4(); //mengambil string acak untuk uuid

  const {
    namaTugas,
    lokasi,
    dasar,
    perihal,
    deskripsi,
    tanggalMulai,
    tanggalSelesai,
    daftarPegawai,
  } = value; // pengambilan value dari masing-masing key

  try {
    await postTugas(
      tugasId,
      namaTugas,
      dasar,
      perihal,
      lokasi,
      deskripsi,
      tanggalMulai,
      tanggalSelesai,
      daftarPegawai
    ); // mengirim ke model untuk dikirim ke database
    res.status(200).json({ response: "Employee assignment successful" }); // mengirim response ke front
  } catch (error) {
    console.error("Failed to save assignment:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the assignment" }); // response internal server bermasalah
  }
};

export const listTugas = async (req, res) => {
  const grup = req.query.grup || "";
  const dateFilter = req.query.date || "";
  const statusApprovalFilter = req.query.status_approval || "";
  const statusFilter = req.query.status || "";

  //refactor untuk dashboar archived
  if (grup === "date") {
    try {
      const data = await getListTugasGrupTime();
      const dataConvert = data.map((tugas) => ({
        ...tugas,
        tanggal_nama: formatTanggalIndo(formatDateIso(tugas.tanggal_mulai)),
        tanggal_mulai: formatDateIso(tugas.tanggal_mulai),
      }));

      const groupedByTanggal = {};

      dataConvert.forEach((item) => {
        let tanggal = item.tanggal_nama;
        let tanggalNumber = item.tanggal_mulai;

        if (!groupedByTanggal[tanggal]) {
          groupedByTanggal[tanggal] = {
            tanggal,
            tanggalNumber,
            kegiatan: new Set(),
            pegawai: new Set(),
            status: new Set(),
          };
        }

        groupedByTanggal[tanggal].kegiatan.add(item.judul_tugas);
        groupedByTanggal[tanggal].pegawai.add(item.nama);
        groupedByTanggal[tanggal].status.add(item.status);
      });

      const result = Object.values(groupedByTanggal).map((item) => ({
        tanggal: item.tanggal,
        tanggalNumber: item.tanggalNumber,
        kegiatan: Array.from(item.kegiatan),
        pegawai: Array.from(item.pegawai),
        status: Array.from(item.status),
      }));

      return res.status(200).json({ message: `success`, data: result });
    } catch (error) {
      console.error("Failed to fetch data tugas:", error);
      return res.status(500).json({
        message: "An error occurred while fetching data tugas",
      });
    }
  } else {
    try {
      let filterConditions = [];
      let tugasListRaw;

      // Tambahkan filter date jika ada
      if (dateFilter) {
        filterConditions.push(`tanggal_mulai = '${dateFilter}'`);
      }
      // Tambahkan filter status jika ada

      if (statusFilter) {
        filterConditions.push(`status = '${statusFilter}'`);
      }

      if (statusApprovalFilter) {
        filterConditions.push(`status_approval = '${statusApprovalFilter}'`);
      }
      // Gabungkan semua filter jadi satu string

      filterConditions.length > 0 ? filterConditions.join(" AND ") : "";

      let whereClause =
        filterConditions.length > 0
          ? `AND ${filterConditions.join(" AND ")}`
          : "";

      tugasListRaw = await getListTugas(whereClause);

      const tugasList = tugasListRaw.map((tugas) => ({
        ...tugas,
        tanggal_mulai: formatDateIso(tugas.tanggal_mulai),
        tanggal_selesai: formatDateIso(tugas.tanggal_selesai),
      }));

      res.status(200).json({
        message: "Data tugas retrieved successfully",
        data: tugasList,
      });
    } catch (error) {
      console.error("Failed to fetch data tugas:", error);
      res.status(500).json({
        message: "An error occurred while fetching data tugas",
      });
    }
  }
};

export const listTugasPegawai = async (req, res) => {
  const dateFilter = req.query.date || "";
  const statusFilter = req.query.status || "";
  let filterConditions = [];
  let arrValue = [];
  arrValue.push(req.params.id);
  // Tambahkan filter date jika ada
  if (dateFilter) {
    filterConditions.push(`tanggal_mulai = ? `);
    arrValue.push(dateFilter);
  }
  // Tambahkan filter status jika ada

  if (statusFilter) {
    filterConditions.push(`status = ? `);
    arrValue.push(statusFilter);
  }

  // Gabungkan semua filter jadi satu string
  const whereClause =
    filterConditions.length > 0 ? `AND ${filterConditions.join(" AND ")}` : "";

  try {
    const tugasListRaw = await getListTugasWithUser(arrValue, whereClause);
    const tugasList = tugasListRaw.map((tugas) => ({
      ...tugas,
      tanggal_mulai: formatDateIso(tugas.tanggal_mulai),
      tanggal_selesai: formatDateIso(tugas.tanggal_selesai),
    }));

    res.status(200).json({
      message: "Data tugas retrieved successfully",
      data: tugasList,
    });
  } catch (error) {
    console.error("Failed to fetch data tugas:", error);
    res.status(500).json({
      message: "An error occurred while fetching data tugas",
    });
  }
};

export const detailTugas = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await getDetailTugas(id);

    if (!result || result.length < 1) {
      return res.status(404).json({ message: "Data not found" });
    }

    const waktu = parseDateTime(result[0].tanggal_mulai);
    const waktuPersetujuan = parseDateTime(result[0].date_approval);
    const data = {
      id_tugas_luar: result[0].id_tugas_luar,
      judul_tugas: result[0].judul_tugas,
      dasar: result[0].dasar,
      perihal: result[0].perihal,
      deskripsi: result[0].deskripsi,
      status: result[0].status,
      status_persetujuan: result[0].status_approval,
      tanggal_persetujuan: waktuPersetujuan.tanggal,
      lokasi: result[0].lokasi,
      tanggal_mulai: waktu.tanggal,
      jam: waktu.jamMenit,
      tanggal_selesai: formatDateIso(result[0].tanggal_selesai),
      pegawai: [],
    };

    result.forEach((tugas) => {
      data.pegawai.push({
        id_user: tugas.id_user,
        nama: tugas.nama,
        nip: tugas.nip,
        jabatan: tugas.jabatan,
      });
    });

    res.status(200).json({ message: "Success fetching data", data: data });
  } catch (error) {
    console.error("Failed to fetch data detail tugas:", error);
    res.status(500).json({
      message: "An error occurred while fetching data detail tugas",
    });
  }
};

export const approveTugas = async (req, res) => {
  const idTugas = req.body.id;
  const tanggal = req.body.tanggal;
  let statusChange;
  // Validasi input
  if (!idTugas) {
    return res
      .status(400)
      .json({ success: false, message: "ID tugas tidak boleh kosong." });
  }
  const date = new Date();
  const format = formatDateOnly(date);

  if (tanggal <= format) {
    statusChange = `, status = 'DIproses' `;
  }
  try {
    const result = await updateStatusApproveTugas(idTugas, statusChange);

    if (!result.success) {
      return res.status(404).json(result);
    }

    // === Ambil pegawai yang ditugaskan ===
    const pegawaiList = await getAllUsersBYIdTugas(idTugas);

    for (const pegawai of pegawaiList) {
      const userId = pegawai.id_user;
      const notifMessage = "Tugas dinas luar kamu telah disetujui.";
      console.log(userId);

      // 1. Simpan ke DB
      await saveNotif(userId, notifMessage);

      // 2. Kirim notifikasi realtime via socket (jika online)
      const socketId = connectedUsers.get(userId);
      if (socketId) {
        io.to(socketId).emit("notification", {
          message: notifMessage,
          link: `/tugas/${idTugas}`,
        });
      }
    }
    io.emit("verification", {
      message: "status tugas berubah",
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in approveTugas:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
      error,
    });
  }
};

export const getArsip = async (req, res) => {
  try {
    let cond = "";
    const dateFilter = req.query.date;

    if (dateFilter) {
      cond = `AND tanggal_mulai = '${dateFilter}'`;
    }
    console.log(dateFilter);
    const data = await getListTugas(cond, true);
    const dataFormated = data.map((value) => ({
      ...value,
      tanggal_mulai: formatDateIso(value.tanggal_mulai),
    }));
    res.status(200).json({ message: "success", data: dataFormated });
  } catch (error) {
    console.error("Error in get data:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
      error,
    });
  }
};
