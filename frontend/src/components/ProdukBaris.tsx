import type { Produk } from "../types";
import { formatRupiah } from "../lib/format";

export default function ProdukBaris({ produk }: { produk: Produk }) {
  const habis = produk.stock === 0; // true kalau stok 0

  return (
    <li className="produk">
      <div className="produk-gambar">
        {/* Kalau ada gambar tampilkan, kalau tidak tampilkan huruf pertama nama produk */}
        {produk.imageUrl ? (
          <img src={produk.imageUrl} alt={produk.name} />
        ) : (
          <span aria-hidden="true">{produk.name.charAt(0)}</span>
        )}
      </div>

      <div className="produk-info">
        <h3>{produk.name}</h3>
        {/* "&&" = tampilkan paragraf hanya kalau description ada isinya */}
        {produk.description && <p>{produk.description}</p>}
      </div>

      <div className="produk-harga">
        <strong>{formatRupiah(produk.price)}</strong>
        {/* Tombol belum berfungsi; keranjang dibuat di langkah berikutnya */}
        <button type="button" disabled={habis}>
          {habis ? "Stok habis" : "Tambah ke keranjang"}
        </button>
      </div>
    </li>
  );
}
