import { PDFViewer } from "@react-pdf/renderer";

import { Document } from "@react-pdf/renderer";
import SuratTugas from "../../components/pdf/suratTugas";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

// Buat style untuk PDF
export const PdfSuratTUgas = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await api.get(`/tugas/detail/${id}`);
      const tugasData = response.data.data;
      setData(tugasData);
    };
    fetch();
  }, []);

  return (
    <div>
      <div style={{ height: "100vh" }}>
        <PDFViewer width={"100%"} height={"100%"}>
          <Document>
            <SuratTugas data={data} />
          </Document>
        </PDFViewer>
      </div>
    </div>
  );
};

export default PdfSuratTUgas;
