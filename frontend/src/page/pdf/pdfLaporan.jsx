import { PDFViewer } from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
import Kopsurat from "../../components/pdf/Kopsurat";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import styles from "../../style/pdf/Pdf";
import { useEffect, useState } from "react";
import api from "../../services/api";

// Buat style untuk PDF
export default function pdf() {
  const { id } = useParams();
  const [data, SetData] = useState({
    bagian: "seksi pelayanan",
    Tanggal: "12-21-2025",
    Dasar: "awikwok",
    hariTanggal: "kamis 27 februari 2025",
    materi: "awikwok",
    lokasi: "gedung wakwak",
    laporan:
      "dhashjdhasjhdjash jhsadjashjd \nhasjdhasjdhajshdjah \njasdhasdhjshjk",
    pegawai: [
      { nama: "udin sarudin" },
      { nama: "udin sarudin" },
      { nama: "udin sarudin" },
      { nama: "udin sarudin" },
    ],
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await api.get(`/documentation/${id}`);
        const files = res.data.data;
        setImages(files);
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div>
      <div style={{ height: "100vh" }}>
        <PDFViewer width={"100%"} height={"100%"}>
          <Document>
            {/* Halaman 1 */}
            <Page size="A4" style={styles.page}>
              <Kopsurat />
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "black",
                  alignSelf: "center", // supaya View selebar isi teks
                  paddingBottom: 2,
                  justifyContent: "center",
                  marginBottom: "30px",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  SURAT LAPORAN
                </Text>
              </View>
              <View style={{ marginBottom: "35px" }}>
                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  <Text style={{ width: 80 }}>Kepada yth</Text>
                  <Text>: Bapak Camat Sukadiri</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  <Text style={{ width: 80 }}>Melalui</Text>
                  <Text>: Bapak Sekertaris Kecamatan Sukadiri</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  <Text style={{ width: 80 }}>Dari</Text>
                  <Text>: {data.bagian}</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  <Text style={{ width: 80 }}>Tanggal</Text>
                  <Text>
                    : {data.Tanggal} //tanggal laporan disubmit benerin
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  <Text style={{ width: 80 }}>Dasar</Text>
                  <Text>: {data.Dasar}</Text>
                </View>
              </View>
              <View style={{ marginBottom: "15px" }}>
                <Text style={{ marginBottom: 5 }}>A. Pelaksanaan</Text>
                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  <Text style={{ width: 80 }}>Hari, Tanggal</Text>
                  <Text>: {data.Dasar}</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  <Text style={{ width: 80 }}>Materi</Text>
                  <Text>: {data.Dasar}</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  <Text style={{ width: 80 }}>Tempat</Text>
                  <Text>: {data.Dasar}</Text>
                </View>
              </View>
              <View style={{ marginBottom: 35 }}>
                <Text style={{ marginBottom: 5 }}>B. Laporan</Text>
                <View style={{ marginLeft: 12 }}>
                  <Text
                    style={{ lineHeight: "20px" }}
                  >{`${data.laporan}`}</Text>
                </View>
              </View>
              <View>
                <Text style={{ marginBottom: 5 }}>Yang melaksanakan tugas</Text>
                <View style={{ marginLeft: 20 }}>
                  {data.pegawai.map((value, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        marginBottom: 10,
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ marginRight: 5 }}>{index + 1}.</Text>
                      <Text style={{ width: 100 }}>{value.nama}</Text>
                      <View
                        style={{
                          width: 150,
                          borderBottomWidth: 1,
                          borderStyle: "dotted",
                          marginLeft: 10,
                          marginRight: 10,
                        }}
                      >
                        <Text>:</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </Page>

            {/* next page  */}
            <Page size="A4" style={styles.page}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: 10,
                }}
              >
                Dokumentasi
              </Text>
              <View>
                {images.map((src, i) => (
                  <View key={i} style={{ marginBottom: 10 }}>
                    <Image src={src.file_url} style={styles.image} />
                  </View>
                ))}
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </div>
    </div>
  );
}
