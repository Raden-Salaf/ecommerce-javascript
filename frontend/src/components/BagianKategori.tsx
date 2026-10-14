import type { CSSProperties } from "react";
import type { Kategori, Produk } from "../types";
import { warnaKategori } from "../lib/warna";
import ProdukBaris from "./ProdukBaris";

type Props = {
  kategori: Kategori;
  daftarProduk: Produk[];
};

export default function BagianKategori({ kategori, daftarProduk }: Props) {
  const warna = warnaKategori(kategori.id);

  // Mengirim warna ke CSS lewat variabel CSS. "as CSSProperties" memberi tahu
  // TypeScript bahwa nama variabel kustom ini sah.
  const gaya = {
    "--warna": warna.latar,
    "--warna-teks": warna.teks,
  } as CSSProperties;

  return (
    <section className="bakul" style={gaya} id={`kategori-${kategori.id}`}>
      <div className="bakul-judul">
        <h2>{kategori.name}</h2>
        <p>{daftarProduk.length} produk</p>
      </div>

      <ul className="bakul-daftar">
        {/* .map = ulangi untuk setiap produk. "key" wajib unik agar React bisa melacak tiap baris */}
        {daftarProduk.map((produk) => (
          <ProdukBaris key={produk.id} produk={produk} />
        ))}
      </ul>
    </section>
  );
}
