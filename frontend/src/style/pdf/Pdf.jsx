import { StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 35,
    margin: 10,
    fontSize: "11px",
  },
  HeadSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 10,
    // padding: 10,
    paddingBottom: 1,
    borderBottom: "2px solid black",
  },
  HeaderText: {
    display: "flex",
    textAlign: "center",
    alignItems: "center",
  },
  ContentSection: {
    border: "1px solid black",
  },
  SecondRow: {
    flex: 1, // Bagi rata semua kolom
    padding: 5, // Spasi dalam kolom
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
  },
  forthRow: {
    display: "flex",
    flexDirection: "row",
    height: "100px", // Bikin kolom berdampingan
    width: "100%", // Penuh lebar halaman
    borderBottom: "1px solid black",
  },
});
export default styles;
