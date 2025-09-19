import { useEffect, useState } from "react";
import { Document, PDFViewer } from "@react-pdf/renderer";
import LaporanPdf from "../../components/pdf/laporanPdf";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import SuratTugas from "../../components/pdf/suratTugas";

// Buat style untuk PDF
export default function PdfArsipDokumen() {
  const { id } = useParams();
  const [dataRincianDana, SetDataRincianDana] = useState([]);
  const [dataUser, SetDataUser] = useState([]);
  const [dataST, SetDataST] = useState([]);
  const [dataTugas, SetDataTugas] = useState({});
  const [dataLaporan, SetDataLaporan] = useState({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/surat-tugas/detail/${id}`);
        const tugasData = response.data.data;
        SetDataST(tugasData);
        const result = await api.get(`/laporan/generate/${id}`);
        const data = result.data.data;
        SetDataLaporan(data.laporan[0]);
        SetDataTugas(data.tugas[0]);
        SetDataUser(data.users);
        SetDataRincianDana(data.rincianDana);
        setImages(data.foto);
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <PDFViewer width="100%" height="100%">
        <Document>
          <SuratTugas data={dataST} />
          <LaporanPdf
            dataLaporan={dataLaporan}
            dataTugas={dataTugas}
            dataUser={dataUser}
            dataRincianDana={dataRincianDana}
            images={images}
          />
        </Document>
      </PDFViewer>
    </div>
  );
}
