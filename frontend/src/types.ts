// "type" = bentuk data. Tidak jadi kode di browser, hanya membantu TypeScript mengecek kesalahan.
export type Kategori = {
  id: number;
  name: string;
};

export type Produk = {
  id: number;
  name: string;
  description: string | null; // "| null" = boleh kosong
  price: number; // rupiah, bilangan bulat
  stock: number;
  imageUrl: string | null;
  categoryId: number;
  category: Kategori;
};
