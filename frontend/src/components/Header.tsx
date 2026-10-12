import Logo from "./Logo"; // memanggil komponen Logo yang tadi dibuat

export default function Header() {
  return (
    <header className="site-header">
      <div className="brand">
        {/* Nanti ganti menjadi: <Logo src="/logo.png" /> */}
        <Logo />
        <span className="brand-name">Bakul-Soax</span>
      </div>
      <nav className="nav">
        <a href="#koleksi">Koleksi</a>
        <a href="#keranjang">Keranjang</a>
        <a href="#masuk" className="nav-login">
          Masuk
        </a>
      </nav>
    </header>
  );
}
``;
