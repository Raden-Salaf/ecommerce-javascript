// Pasangan warna latar dan warna teks agar tulisan tetap terbaca di tiap warna
const daftarWarna = [
  { latar: "var(--kobalt)", teks: "#ffffff" },
  { latar: "var(--permen)", teks: "var(--ink)" },
  { latar: "var(--lemon)", teks: "var(--ink)" },
  { latar: "var(--mint)", teks: "var(--ink)" },
];

// Warna ditentukan dari id kategori. Tanda % (sisa bagi) membuat warna berulang
// kalau kategorinya lebih banyak dari jumlah warna, jadi aman untuk kategori baru.
export function warnaKategori(id: number) {
  return daftarWarna[(id - 1) % daftarWarna.length];
}
