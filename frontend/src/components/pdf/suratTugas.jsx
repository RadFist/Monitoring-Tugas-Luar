import Kopsurat from "../../components/pdf/Kopsurat";
import { Page, Text, View } from "@react-pdf/renderer";
import styles from "../../style/pdf/Pdf";
import { TableComponentST } from "./tablePdf";
import { formatTanggalBulan, hitungLamaTugas } from "../../utils/formatedTime";

const SuratTugas = ({ data }) => {
  const camat = "AHMAD HAPID, A.P,M.Si";
  return (
    <>
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
                  marginBottom: 10,
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
                  marginBottom: "20px",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 5,
                    maxWidth: "100%",
                    alignItems: "flex-start",
                  }}
                >
                  <Text style={{ width: 60, fontWeight: "bold" }}>Tanggal</Text>
                  <Text style={{ width: 400 }}>
                    : {formatTanggalBulan(data?.tanggal_mulai)}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 5,
                    maxWidth: "100%",
                    alignItems: "flex-start",
                  }}
                >
                  <Text style={{ width: 60, fontWeight: "bold" }}>Alamat</Text>
                  <Text style={{ width: 400 }}>: {data?.alamat}</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 5,
                    maxWidth: "100%",
                    alignItems: "flex-start",
                  }}
                >
                  <Text style={{ width: 60, fontWeight: "bold" }}>Tempat</Text>
                  <Text style={{ width: 400 }}>: {data?.lokasi}</Text>
                </View>
              </View>

              <Text style={{ textAlign: "justify", lineHeight: 1.3 }}>
                {"                      "}Demikian Surat Perintah Ini
                Dekeluarkan Agar Dapat Dilaksanakan Sebaik-baiknya dengan penuh
                rasa Tanggung jawab
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
              <Text>
                Sukadiri, {formatTanggalBulan(data?.tanggal_persetujuan, false)}
              </Text>
              <Text>Camat Sukadiri</Text>
              <Text> </Text>
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
                  marginBottom: "2px",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>{camat}</Text>
              </View>
              <Text>197312191994031003</Text>
            </View>
          </View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Kopsurat></Kopsurat>
        <View>
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: "black",
              alignSelf: "center", // supaya View selebar isi teks
              paddingBottom: 0,
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              SURAT PERJALANAN DINAS (SPD)
            </Text>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: "black",
              margin: 10,
              fontSize: 10,
            }}
          >
            {/* Baris 1 */}
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "black",
              }}
            >
              <View
                style={{
                  width: "5%",
                  borderRightWidth: 1,
                  borderColor: "black",
                  padding: 4,
                }}
              >
                <Text>1.</Text>
              </View>
              <View
                style={{
                  width: "45%",
                  borderRightWidth: 1,
                  borderColor: "black",
                  padding: 4,
                }}
              >
                <Text>Pengguna Anggaran/Kuasa Pengguna Anggaran</Text>
              </View>
              <View style={{ width: "50%", padding: 4 }}>
                <Text>CAMAT SUKADIRI</Text>
              </View>
            </View>

            {/* Baris 2 */}
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "black",
              }}
            >
              <View
                style={{
                  width: "5%",
                  borderRightWidth: 1,
                  borderColor: "black",
                  padding: 4,
                }}
              >
                <Text>2.</Text>
              </View>
              <View
                style={{
                  width: "45%",
                  borderRightWidth: 1,
                  borderColor: "black",
                  padding: 4,
                }}
              >
                <Text>Tingkat Biaya Perjalanan Dinas</Text>
              </View>
              <View style={{ width: "50%", padding: 4 }}>
                <Text>{data?.tingkat_biaya}</Text>
              </View>
            </View>

            {/* Baris 3 */}
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "black",
              }}
            >
              <View
                style={{
                  width: "5%",
                  borderRightWidth: 1,
                  borderColor: "black",
                  padding: 4,
                }}
              >
                <Text>3.</Text>
              </View>
              <View
                style={{
                  width: "45%",
                  borderRightWidth: 1,
                  borderColor: "black",
                  padding: 4,
                }}
              >
                <Text>Maksud Perjalanan Dinas</Text>
              </View>
              <View style={{ width: "50%", padding: 4 }}>
                <Text>Menghadiri {data?.perihal}</Text>
              </View>
            </View>

            {/* Baris 4 */}
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "black",
              }}
            >
              <View
                style={{
                  width: "5%",
                  borderRightWidth: 1,
                  borderColor: "black",
                  padding: 4,
                }}
              >
                <Text>4.</Text>
              </View>
              <View
                style={{
                  width: "45%",
                  borderRightWidth: 1,
                  borderColor: "black",
                  padding: 4,
                }}
              >
                <Text>Alat angkut yang dipergunakan</Text>
              </View>
              <View style={{ width: "50%", padding: 4 }}>
                <Text>{data?.kendaraan}</Text>
              </View>
            </View>

            {/* Baris 5 */}
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "black",
              }}
            >
              <View
                style={{
                  width: "5%",
                  borderRightWidth: 1,
                  borderColor: "black",
                  padding: 4,
                }}
              >
                <Text>5.</Text>
              </View>
              <View
                style={{
                  width: "45%",
                  borderRightWidth: 1,
                  borderColor: "black",
                  padding: 4,
                }}
              >
                <Text>a. Tempat berangkat</Text>
                <Text>b. Tempat tujuan</Text>
              </View>
              <View style={{ width: "50%", padding: 4 }}>
                <Text>Kecamatan Sukadiri</Text>
                <Text> {data?.lokasi}</Text>
              </View>
            </View>

            {/* Baris 6 */}
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "black",
              }}
            >
              <View
                style={{
                  width: "5%",
                  borderRightWidth: 1,
                  borderColor: "black",
                  padding: 4,
                }}
              >
                <Text>6.</Text>
              </View>
              <View
                style={{
                  width: "45%",
                  borderRightWidth: 1,
                  borderColor: "black",
                  padding: 4,
                }}
              >
                <Text>a. Lamanya Perjalanan Dinas</Text>
                <Text>b. Tanggal berangkat</Text>
                <Text>c. Tanggal harus kembali/tiba di tempat baru</Text>
              </View>
              <View style={{ width: "50%", padding: 4 }}>
                <Text>
                  {hitungLamaTugas(data?.tanggal_mulai, data?.tanggal_selesai)}
                </Text>
                <Text>{formatTanggalBulan(data?.tanggal_mulai)}</Text>
                <Text>{formatTanggalBulan(data?.tanggal_selesai)}</Text>
              </View>
            </View>

            {/* Baris 7 (Pengikut) */}
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "black",
              }}
            >
              <View
                style={{
                  width: "5%",
                  borderRightWidth: 1,
                  borderColor: "black",
                  padding: 4,
                }}
              >
                <Text>7.</Text>
              </View>
              <View
                style={{
                  width: "45%",
                  borderRightWidth: 1,
                  borderColor: "black",
                  padding: 4,
                }}
              >
                <Text>Pelaksana </Text>
              </View>
              <View style={{ width: "50%", padding: 4 }}>
                <Text>Nama</Text>
                {data?.pegawai.map((value, i) => (
                  <>
                    <Text key={i}>
                      {i + 1}.{value.nama}
                      {"  "} Nip.{value.nip}
                    </Text>
                  </>
                ))}
              </View>
            </View>

            {/* Baris 8*/}
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: "5%",
                  borderRightWidth: 1,
                  borderColor: "black",
                  padding: 4,
                }}
              >
                <Text>8.</Text>
              </View>
              <View
                style={{
                  width: "45%",
                  borderRightWidth: 1,
                  borderColor: "black",
                  padding: 4,
                }}
              >
                <Text>Keterangan lain-lain</Text>
              </View>
              <View style={{ width: "50%", padding: 4 }}>
                <Text>{data?.deskripsi}</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
              display: "flex",
              alignItems: "flex-end",
              paddingRight: 10,
            }}
          >
            <View
              style={{
                marginTop: 20,
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Text>Dikeluarkan di : Sukadiri</Text>
              <Text>
                Tanggal : {formatTanggalBulan(data?.tanggal_persetujuan, false)}
              </Text>
              <Text>CAMAT SUKADIRI</Text>
            </View>
            <Text style={{ marginTop: 50, fontWeight: "bold" }}>
              AHMAD HAPID, A.P., M.Si
            </Text>
            <Text>NIP. 19731219 199403 1 003</Text>
          </View>
        </View>
      </Page>
    </>
  );
};

export default SuratTugas;
