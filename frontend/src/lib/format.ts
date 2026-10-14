// Mengubah angka 149000 menjadi teks "Rp 149.000" sesuai format Indonesia
export function formatRupiah(angka: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0, // tanpa angka di belakang koma
  }).format(angka);
}
