import { customQuery } from "../model/model.js";
import { getListTugasGrupTime } from "../model/tugasLuarModel.js";
import { formatDateIso, formatTanggalIndo } from "../utils/dateFormater.js";

export const getDataDashboard = async (req, res) => {
  try {
    const data = await getListTugasGrupTime();
    const countUser = await customQuery(
      `SELECT COUNT(id_user) as user FROM tb_user WHERE level != "super admin"`
    );
    const countTugas = await customQuery(
      `SELECT COUNT(id_tugas_luar) as tugas FROM tb_tugas_luar WHERE status_approval = "approve"`
    );
    const countArsip = await customQuery(
      `SELECT COUNT(id_tugas_luar) as arsip FROM tb_tugas_luar WHERE status_approval = "archived"`
    );
    const countPending = await customQuery(
      `SELECT COUNT(id_tugas_luar) as pending FROM tb_tugas_luar WHERE status_approval = "pending"`
    );

    //
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

      groupedByTanggal[tanggal].kegiatan.add({
        id_tugas_luar: item.id_tugas_luar,
        judul_tugas: item.judul_tugas,
        lokasi: item.lokasi,
        nama: item.nama,
        status: "belum mulai",
      });
    });

    const resultList = Object.values(groupedByTanggal).map((item) => ({
      tanggal: item.tanggal,
      tanggalNumber: item.tanggalNumber,
      kegiatan: Array.from(item.kegiatan),
    }));

    const result = {
      list: resultList,
      count: {
        user: countUser.user,
        tugas: countTugas.tugas,
        arsip: countArsip.arsip,
        pending: countPending.pending,
      },
    };

    return res.status(200).json({ message: `success`, data: result });
  } catch (error) {
    console.error("Failed to fetch data tugas:", error);
    return res.status(500).json({
      message: "An error occurred while fetching data tugas",
    });
  }
};
