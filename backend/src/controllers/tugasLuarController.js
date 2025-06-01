import { v4 as uuidv4 } from "uuid";
import { postTugas, getListTugas } from "../model/tugasLuarModel.js";
import { schemaPneguasan } from "../utils/schemaJoi.js";
import { formatDateIso } from "../utils/dateFormater.js";

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
    deskripsi,
    tanggalMulai,
    tanggalSelesai,
    daftarPegawai,
  } = value; // pengambilan value dari masing-masing key

  try {
    await postTugas(
      tugasId,
      namaTugas,
      lokasi,
      deskripsi,
      tanggalMulai,
      tanggalSelesai,
      daftarPegawai
    ); // mengirim ke model untuk dikirim ke database
    res.status(200).json({ response: "penugasan pegawai berhasil" }); // mengirim response ke front
  } catch (error) {
    console.error("Gagal input penugasan:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat menyimpan penugasan" }); // response internal server bermasalah
  }
};

export const listTugas = async (req, res) => {
  try {
    const tugasListRaw = await getListTugas();

    const tugasList = tugasListRaw.map((tugas) => ({
      ...tugas,
      tanggal_mulai: formatDateIso(tugas.tanggal_mulai),
      tanggal_selesai: formatDateIso(tugas.tanggal_selesai),
    }));

    res.status(200).json({
      message: "Data tugas berhasil diambil",
      data: tugasList,
    });
  } catch (error) {
    console.error("Gagal mengambil data tugas:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data tugas",
    });
  }
};
