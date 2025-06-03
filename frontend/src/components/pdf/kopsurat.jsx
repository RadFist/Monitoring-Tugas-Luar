import styles from "../../style/pdf/Pdf";
import { Text, Image, View } from "@react-pdf/renderer";
const kopsurat = () => {
  const text = {
    kabupaten: "PEMERINTAHAN KABUPATEN TANGERANG",
    kecamatan: "KECAMATAN  SUKADIRI",
    alamat: "JL. Raya Sukadiri No. 1 Tangerang-Kode Pos: 15530",
    alamatElektronik:
      "Laman sukadiri.tangerangkab.go.id, Pos-el kecsukadiri@gmail.com",
  };
  return (
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
  );
};

export default kopsurat;
