import Header from "./components/Header";

// App = komponen paling atas yang membungkus seluruh halaman
export default function App() {
  return (
    // <> ... </> disebut Fragment: pembungkus tak terlihat, karena JSX hanya boleh mengembalikan satu "akar"
    <>
      <div className="stripes" />
      <Header />
      <main className="page">
        {/* Teks sementara. Nanti diganti daftar produk dari backend */}
        <h1>Koleksi sedang disiapkan</h1>
        <p>Sebentar lagi rak ini penuh dengan kaus kaki berwarna.</p>
      </main>
    </>
  );
}
