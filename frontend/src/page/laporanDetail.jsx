import { useNavigate } from "react-router-dom";
import "../style/laporanDetail.css";

export default function LaporanDetail() {
  const navigate = useNavigate();

  // Dummy data laporan tugas luar
  const laporan = {
    nama_pegawai: "Budi Santoso",
    nip: "19801212 200112 1 001",
    jabatan: "Staff Pelayanan Umum",
    tanggal: "2025-06-13",
    tujuan: "Kantor Bupati Tangerang",
    keterangan:
      "Mengantarkan dokumen penting dari Kecamatan ke Sekretariat Daerah.",
    status: "Disetujui",
    file: "/dummy/lampiran.pdf", // bisa kosong juga
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="laporan-container">
      <h2>Pelaporan Tugas Luar Pegawai</h2>
      <div className="laporan-detail">
        <p>
          <strong>Nama Pegawai:</strong> {laporan.nama_pegawai}
        </p>
        <p>
          <strong>NIP:</strong> {laporan.nip}
        </p>
        <p>
          <strong>Jabatan:</strong> {laporan.jabatan}
        </p>
        <p>
          <strong>Tanggal:</strong> {laporan.tanggal}
        </p>
        <p>
          <strong>Tujuan:</strong> {laporan.tujuan}
        </p>
        <p>
          <strong>Keterangan:</strong> {laporan.keterangan}
        </p>
        <p>
          <strong>Status:</strong> {laporan.status}
        </p>
        {laporan.file && (
          <p>
            <strong>Lampiran:</strong>{" "}
            <a href={laporan.file} target="_blank">
              Lihat File
            </a>
          </p>
        )}
      </div>
      <div className="laporan-actions">
        <button onClick={() => navigate(-1)}>Kembali</button>
        <button onClick={handlePrint}>Cetak</button>
      </div>
    </div>
  );
}
