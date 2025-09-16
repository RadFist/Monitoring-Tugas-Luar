export function formatRupiah(angka) {
  if (!angka && angka !== 0) return "0";
  return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
