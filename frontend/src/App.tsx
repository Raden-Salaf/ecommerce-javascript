import Header from "./components/Header";
import BagianKategori from "./components/BagianKategori";
import { kategoriMock, produkMock } from "./data/mock";

export default function App() {
  return (
    <>
      <div className="stripes" />
      <Header />
      <main>
        <section className="page">
          <h1>Semua kebutuhan rumah, dari dapur sampai kamar bayi.</h1>
          <p>Pilih per rak, bayar sekali.</p>
        </section>

        <div id="koleksi">
          {/* Untuk tiap kategori, tampilkan satu bakul berisi produk dengan categoryId yang sama */}
          {kategoriMock.map((kategori) => (
            <BagianKategori
              key={kategori.id}
              kategori={kategori}
              daftarProduk={produkMock.filter(
                (p) => p.categoryId === kategori.id,
              )}
            />
          ))}
        </div>
      </main>
    </>
  );
}
