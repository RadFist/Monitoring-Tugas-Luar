import Kopsurat from "../../components/pdf/Kopsurat";
import { Page, Text, View, Image } from "@react-pdf/renderer";
import styles from "../../style/pdf/Pdf";
import { formatTanggalBulan } from "../../utils/formatedTime";

const LaporanPdf = ({
  dataLaporan,
  dataTugas,
  dataUser,
  dataRincianDana,
  images,
}) => {
  let total = 0;
  return (
    <>
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
            <Text style={{ width: 80 }}>Dari</Text>
            <Text>: {dataLaporan?.bagian}</Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text style={{ width: 80 }}>Tanggal</Text>
            <Text>: {formatTanggalBulan(dataLaporan?.Tanggal_dibuat)}</Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text style={{ width: 80 }}>Dasar</Text>
            <Text>: {dataTugas?.dasar}</Text>
          </View>
        </View>
        <View style={{ marginBottom: "15px" }}>
          <Text style={{ marginBottom: 5 }}>A. Pelaksanaan</Text>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text style={{ width: 80 }}>Hari, Tanggal</Text>
            <Text>: {formatTanggalBulan(dataTugas?.tanggal_mulai)}</Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text style={{ width: 80 }}>Materi</Text>
            <Text>: {dataLaporan?.materi}</Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text style={{ width: 80 }}>Tempat</Text>
            <Text>: {dataTugas?.lokasi}</Text>
          </View>
        </View>
        <View style={{ marginBottom: 35 }}>
          <Text style={{ marginBottom: 5 }}>B. Laporan</Text>
          <View style={{ marginLeft: 12, minHeight: "40px" }}>
            <Text
              style={{ lineHeight: "20px" }}
            >{`${dataLaporan?.laporan}`}</Text>
          </View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View>
          <Text style={{ marginBottom: 10 }}>Yang melaksanakan tugas</Text>
          <View style={{ marginLeft: 20, marginBottom: 20 }}>
            {dataUser.map((value, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                  alignItems: "flex-start",
                }}
              >
                <Text style={{ marginRight: 5 }}>{index + 1}.</Text>
                <Text style={{ width: 150, lineHeight: "15px" }}>
                  {value.nama}
                </Text>
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

          <View>
            {dataRincianDana.lenght > 0 && (
              <Text style={{ marginBottom: 10 }}>Rincian Dana</Text>
            )}
            <View style={{ marginLeft: 20 }}>
              {dataRincianDana.map((value, index) => {
                total = total + value.jumlah;
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      marginBottom: 10,
                      alignItems: "flex-start",
                    }}
                  >
                    <Text style={{ marginRight: 5 }}>{index + 1}.</Text>
                    <Text style={{ width: 150, lineHeight: "15px" }}>
                      {value.deskripsi}
                    </Text>
                    <View
                      style={{
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                    >
                      <Text>: Rp.{value.jumlah} </Text>
                    </View>
                  </View>
                );
              })}
              {dataRincianDana.lenght > 0 && <Text>Total : Rp {total}</Text>}
            </View>
          </View>
        </View>
      </Page>

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
    </>
  );
};

export default LaporanPdf;
