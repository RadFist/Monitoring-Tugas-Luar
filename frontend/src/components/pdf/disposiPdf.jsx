// File: PdfDocument.jsx
import React from "react";
import { Document, Page, Text, Image, View } from "@react-pdf/renderer";
import styles from "../../style/disposisiPdf";

// Komponen PDF
const PdfDocument = ({ title, content }) => {
  const text = {
    kabupaten: "PEMERINTAHAN KABUPATEN TANGERANG",
    kecamatan: "KECAMATAN  SUKADIRI",
    alamat: "JL. Raya Sukadiri No. 1 Tangerang-Kode Pos: 15530",
    alamatElektronik:
      "Laman sukadiri.tangerangkab.go.id, Pos-el kecsukadiri@gmail.com",
    headContent: "LEMBAR DISPOSISI",
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.HeadSection}>
          <View>
            <Image
              src="/img/logokab.png"
              alt="logo"
              style={{ width: 70, height: 70 }}
            />
          </View>
          <View style={styles.HeaderText}>
            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
              {text.kabupaten}
            </Text>
            <Text style={{ fontSize: "23px", fontWeight: "ultrabold" }}>
              {text.kecamatan}
            </Text>
            <Text style={{ fontSize: "11px", fontWeight: "thin" }}>
              {text.alamat}
            </Text>
            <Text style={{ fontSize: "11px", fontWeight: "thin" }}>
              {text.alamatElektronik}
            </Text>
          </View>
        </View>

        {/* head table */}
        <View style={styles.ContentSection}>
          <view
            style={{
              borderBottom: "1px solid black",
              padding: "5px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            <Text>{text.headContent}</Text>
          </view>

          {/* second row */}
          <View
            style={{ display: "flex", flexDirection: "row", width: "100%" }}
          >
            <View style={[styles.SecondRow]}>
              <Text>Surat dari: </Text>
              <Text>isi </Text>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text>No. Surat: </Text>
                <Text>isi</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text>Tgl. Surat: </Text>
                <Text>isi</Text>
              </View>
            </View>
            <View style={[styles.SecondRow]}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text>Diterima Tgl: </Text>
                <Text>isi</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text>Tgl. Surat: </Text>
                <Text>isi</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text>No. Agenda: </Text>
                <Text></Text>
              </View>
              <Text>Sifat:</Text>
              <Text style={{ textAlign: "center" }}>Sangat Segera</Text>
            </View>
            <View
              style={[
                styles.SecondRow,
                { justifyContent: "flex-end", alignItems: "center" },
              ]}
            >
              <View>
                <Text>Segera</Text>
              </View>
            </View>
            <View
              style={[
                styles.SecondRow,
                {
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderRight: "none",
                },
              ]}
            >
              <Text>Rahasia</Text>
            </View>
          </View>

          {/* third row */}
          <View
            style={{
              borderBottom: "1px solid black",
              height: "80px",
              padding: 5,
            }}
          >
            <Text>hal: </Text>
            <Text></Text>
          </View>

          {/* forth row */}
          <View style={styles.forthRow}>
            <View style={{ borderRight: "1px solid black", flex: 3 }}>
              <View
                style={{
                  padding: "5px",
                  height: "60px",
                }}
              >
                <Text>Diteruskan Kepada Sdr:</Text>
              </View>
              <View style={{ padding: "5px", height: "10px" }}>
                <Text>Dan Seterusnya</Text>
              </View>
            </View>
            <View style={{ flex: 1, paddingLeft: "5px", margin: 0 }}>
              <Text>Dengan Hormat Harap:</Text>/<Text>Tanggapan dan Saran</Text>
              <Text>Proses lebih lanjut</Text>
              <Text>Kordinasi/konfirmasi</Text>
            </View>
          </View>
          <View
            style={{
              padding: 5,
              minHeight: "200px",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <View style={{ flex: 2 }}>
              <Text>Catatan:</Text>
            </View>
            <View
              style={{
                display: "flex",
                alignItems: "flex-end",
                padding: 5,
                paddingBottom: 0,
                flex: 1.5,
              }}
            >
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Text>Camat Sukadiri</Text>
                <Text style={{ margin: "25px" }}></Text>
                <Text>Ahmad Hapid, AP., M.Si</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;
