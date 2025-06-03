import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  table: {
    display: "table",
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
  },
  headerCell: {
    flex: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 5,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 10,
  },
  cell: {
    flex: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 5,
    fontSize: 10,
  },
  cellNumber: {
    flex: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 5,
    fontSize: 10,
    textAlign: "center",
  },
  lastCell: {
    borderRightWidth: 0, // tidak ada garis kanan di sel terakhir
  },
});

export const TableComponentST = ({ data }) => (
  <View style={styles.table}>
    {/* Header */}
    <View style={styles.row}>
      <Text style={[styles.cellNumber, { flex: 0.5 }]}>No</Text>
      <Text style={styles.headerCell}>Nama / NIP</Text>
      <Text style={[styles.headerCell, styles.lastCell]}>Jabatan</Text>
    </View>

    {/* Isi Data */}
    {data?.map((item, index) => (
      <View style={styles.row} key={item.id_user || index}>
        <Text style={[styles.cellNumber, { flex: 0.5 }]}>{index + 1}</Text>
        <Text style={styles.cell}>
          {item.nama} / {item.nip}
        </Text>
        <Text style={[styles.cell, styles.lastCell]}>
          {item.jabatan || "-"}
        </Text>
      </View>
    ))}
  </View>
);
