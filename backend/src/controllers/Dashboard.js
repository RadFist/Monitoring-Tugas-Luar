import { customQuery, customQueryArray } from "../model/model.js";
import { getListTugasGrupTime } from "../model/tugasLuarModel.js";
import { formatDateIso, formatTanggalIndo } from "../utils/dateFormater.js";

export const getDataDashboard = async (req, res) => {
  const YEAR = new Date().getFullYear();
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
    const countUserProductivity = await customQueryArray(
      `SELECT u.nama, COUNT(tl.id_tugas_luar) AS tugas FROM tb_tugas_luar AS tl
      JOIN tb_pivot_tugas AS p ON p.id_tugas_luar = tl.id_tugas_luar
      JOIN tb_user AS u ON u.id_user = p.id_pegawai
      WHERE tl.status_approval != "pending" 
      GROUP BY u.id_user ORDER BY tugas DESC LIMIT 5;`
    );
    const dataTugasbyMonth = await customQueryArray(
      `SELECT DATE_FORMAT(tanggal_mulai, '%M') AS bulan, COUNT(*) AS total_tugas FROM  tb_tugas_luar 
      WHERE YEAR(tanggal_mulai) = ${YEAR}
      GROUP BY  MONTH(tanggal_mulai), bulan ORDER BY MONTH(tanggal_mulai);`
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
      userProductivity: countUserProductivity,
      TugasbyMonth: dataTugasbyMonth,
    };

    return res.status(200).json({ message: `success`, data: result });
  } catch (error) {
    console.error("Failed to fetch data tugas:", error);
    return res.status(500).json({
      message: "An error occurred while fetching data tugas",
    });
  }
};
