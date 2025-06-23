import Kopsurat from "../../components/pdf/Kopsurat";
import { Page, Text, View } from "@react-pdf/renderer";
import styles from "../../style/pdf/Pdf";
import { TableComponentST } from "./tablePdf";

const SuratTugas = ({ data }) => {
  const camat = "AHMAD HAPID, A.P,M.Si";
  return (
    <Page size="A4" style={styles.page}>
      <Kopsurat />
      {/* head table */}
      <View>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: "black",
            alignSelf: "center", // supaya View selebar isi teks
            paddingBottom: 2,
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            SURAT PERINTAH
          </Text>
        </View>
        <View>
          <Text style={{ marginBottom: 10 }}>Yang mengetahui:</Text>

          <View>
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
              <Text style={{ width: 80 }}>Nama</Text>
              <Text>: {camat}</Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
              <Text style={{ width: 80 }}>Nip</Text>
              <Text>: 197312191994031003</Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
              <Text style={{ width: 80 }}>Jabatan</Text>
              <Text>: Camat Kecamatan Sukadiri Kabupaten Tangerang</Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
              <Text style={{ width: 80 }}>Dasar</Text>
              <Text>: {data?.dasar}</Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 30 }}>
              <Text style={{ width: 80 }}>Perihal</Text>
              <Text>: {data?.perihal}</Text>
            </View>
            <View
              style={{
                alignSelf: "center", // supaya View selebar isi teks
                paddingBottom: 2,
                justifyContent: "center",
                marginBottom: 30,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                M E M E R I N T A H K A N
              </Text>
            </View>
            <Text>Kepada:</Text>
            <TableComponentST data={data?.pegawai} />
            <View
              style={{
                flexDirection: "row",
                marginBottom: 5,
                marginTop: 5,
              }}
            >
              <Text>untuk </Text>
              <Text>: Menghadiri {data?.perihal} pada:</Text>
            </View>

            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View>
                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  <Text style={{ width: 50 }}>Tanggal</Text>
                  <Text>: {data?.tanggal_mulai}</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  <Text style={{ width: 50 }}>Waktu</Text>
                  <Text>: {data?.jam}</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 30 }}>
                  <Text style={{ width: 50 }}>Tempat</Text>
                  <Text>: {data?.lokasi}</Text>
                </View>
              </View>
            </View>
            <Text style={{ textAlign: "justify", lineHeight: 1.3 }}>
              {"                      "}Demikian Surat Perintah Ini Dekeluarkan
              Agar Dapat Dilaksanakan Sebaik-baiknya dengan penuh rasa Tanggung
              jawab
            </Text>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            alignItems: "flex-end",
            marginTop: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Sukadiri, {data?.tanggal_persetujuan}</Text>
            <Text>Camat Sukadiri</Text>
            <Text> </Text>
            <Text> </Text>
            <Text> </Text>
            <Text> </Text>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: "black",
                alignSelf: "auto", // supaya View selebar isi teks
                paddingBottom: 2,
                marginBottom: "10px",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{camat}</Text>
            </View>
            <Text>197312191994031003</Text>
          </View>
        </View>
      </View>
    </Page>
  );
};

export default SuratTugas;
