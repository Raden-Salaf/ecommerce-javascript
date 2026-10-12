// Props = "parameter" yang diterima komponen dari luar.
// Tanda "?" artinya opsional: boleh diisi, boleh tidak.
type LogoProps = {
  src?: string; // alamat gambar logo
  size?: number; // diameter lingkaran dalam piksel
};

// size = 56 artinya: kalau tidak diisi, pakai 56
export default function Logo({ src, size = 56 }: LogoProps) {
  return (
    // style={{...}} = mengatur CSS langsung dari kode (kurung kurawal ganda: satu untuk JSX, satu untuk objek)
    <div className="logo" style={{ width: size, height: size }}>
      {/* Kalau src ada tampilkan gambar logo, kalau tidak tampilkan huruf B sebagai placeholder */}
      {src ? (
        <img src={src} alt="Logo Bakul-Soax" />
      ) : (
        <span aria-hidden="true">B</span>
      )}
    </div>
  );
}
