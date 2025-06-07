import { v4 as uuidv4 } from "uuid";
import {
  postTugas,
  getListTugas,
  getDetailTugas,
  updateStatusApproveTugas,
  getListTugasBYIdUser,
} from "../model/tugasLuarModel.js";
import { schemaPneguasan } from "../utils/schemaJoi.js";
import { formatDateIso, parseDateTime } from "../utils/dateFormater.js";

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
  const userLevel = req.custom?.user?.level;
  try {
    let tugasListRaw = "";
    if (userLevel === "camat") {
      tugasListRaw = await getListTugas("status_approval = 'pending' ");
    } else {
      tugasListRaw = await getListTugas();
    }
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

export const listTugasPegawai = async (req, res) => {
  const id = req.params.id;
  try {
    const tugasListRaw = await getListTugasBYIdUser(id);
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
    const data = {
      id_tugas_luar: result[0].id_tugas_luar,
      judul_tugas: result[0].judul_tugas,
      dasar: result[0].dasar,
      perihal: result[0].perihal,
      deskripsi: result[0].deskripsi,
      status: result[0].status,
      status_persetujuan: result[0].status_approval,
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
  const id = req.body.id;
  // Validasi input
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "ID tugas tidak boleh kosong." });
  }

  try {
    const result = await updateStatusApproveTugas(id);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error in approveTugas:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
      error,
    });
  }
};
