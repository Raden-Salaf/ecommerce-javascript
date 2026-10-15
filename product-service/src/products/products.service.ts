import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  // Daftar produk dengan pencarian, filter kategori, dan halaman (pagination)
  async findAll(query: QueryProductDto) {
    const { search, categoryId, page = 1, limit = 12 } = query;

    // "where" = syarat pencarian. Syarat hanya dipasang kalau parameternya dikirim.
    const where: Prisma.ProductWhereInput = {
      ...(categoryId ? { categoryId } : {}),
      // "contains" = nama mengandung kata yang dicari (di MySQL otomatis tidak peka huruf besar/kecil)
      ...(search ? { name: { contains: search } } : {}),
    };

    // $transaction = jalankan dua query sekaligus: ambil data halaman ini + hitung total
    const [data, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        include: { category: true },       // sertakan data kategorinya
        orderBy: { createdAt: 'desc' },    // terbaru di atas
        skip: (page - 1) * limit,          // lewati data di halaman sebelumnya
        take: limit,                       // ambil sebanyak "limit"
      }),
      this.prisma.product.count({ where }),
    ]);

    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const produk = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!produk) {
      throw new NotFoundException(`Produk dengan id ${id} tidak ditemukan`);
    }
    return produk;
  }

  async create(dto: CreateProductDto) {
    await this.pastikanKategoriAda(dto.categoryId);
    return this.prisma.product.create({ data: dto, include: { category: true } });
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.findOne(id); // pastikan produknya ada, kalau tidak otomatis error 404
    if (dto.categoryId) {
      await this.pastikanKategoriAda(dto.categoryId);
    }
    return this.prisma.product.update({ where: { id }, data: dto, include: { category: true } });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.product.delete({ where: { id } });
    return { message: `Produk ${id} berhasil dihapus` };
  }

  // Cegah produk dibuat dengan kategori yang tidak ada
  private async pastikanKategoriAda(categoryId: number) {
    const ada = await this.prisma.category.findUnique({ where: { id: categoryId } });
    if (!ada) {
      throw new BadRequestException(`Kategori dengan id ${categoryId} tidak ada`); // kode HTTP 400
    }
  }
}