import Joi from "joi";

export const schemaRegist = Joi.object({
  username: Joi.string().alphanum().min(1).max(40).required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  nama: Joi.string().min(1).max(100).required(),
  nip: Joi.string()
    .pattern(/^\d{8,20}$/)
    .required(),
  jabatan: Joi.string(),
});

export const schemaLogin = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email(),
});

export const schemaAdd = Joi.object({
  username: Joi.string().alphanum().min(1).max(40).required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  nama: Joi.string().min(1).max(100).required(),
  nip: Joi.string()
    .pattern(/^\d{8,20}$/)
    .required(),
  level: Joi.string()
    .valid("admin", "umpeg", "pegawai", "verifikator")
    .default("pegawai"),
  jabatan: Joi.string(),
});

export const schemaEdit = Joi.object({
  username: Joi.string().alphanum().min(1).max(40),
  password: Joi.string().min(8),
  email: Joi.string().email(),
  nama: Joi.string().min(1).max(100),
  nip: Joi.string().pattern(/^\d{8,20}$/),
  level: Joi.string()
    .valid("kasi", "umpeg", "pegawai", "camat")
    .default("pegawai"),
  Jabatan: Joi.string(),
});

export const schemaPneguasan = Joi.object({
  namaTugas: Joi.string().required(),
  lokasi: Joi.string().required(),
  dasar: Joi.string().required(),
  perihal: Joi.string().required(),
  deskripsi: Joi.string().required(),
  alamat: Joi.string().required(),
  tingkat_biaya: Joi.string().required(),
  kendaraan: Joi.string().required(),
  tanggalMulai: Joi.date().required(),
  tanggalSelesai: Joi.date().required(),
  daftarPegawai: Joi.array().required(),
  tugas_id: Joi.string(),
});
