import { PDFViewer } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import PdfDocument from "../components/pdf/DisposiPdf";
// Buat style untuk PDF
export default function pdf() {
  const location = useLocation();
  const { title, content } = location.state || {};

  return (
    <div>
      <div style={{ height: "100vh" }}>
        <PDFViewer width={"100%"} height={"100%"}>
          <PdfDocument title={title} content={content} />
        </PDFViewer>
      </div>
    </div>
  );
}
