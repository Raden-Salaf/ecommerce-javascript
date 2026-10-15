import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  // NestJS otomatis menyediakan PrismaService (dependency injection)
  constructor(private readonly prisma: PrismaService) {}

  // Ambil semua kategori, urut A-Z, sekalian hitung jumlah produk di tiap kategori
  findAll() {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { products: true } } },
    });
  }

  async create(dto: CreateCategoryDto) {
    // Cek dulu: nama kategori tidak boleh kembar
    const sudahAda = await this.prisma.category.findUnique({ where: { name: dto.name } });
    if (sudahAda) {
      throw new ConflictException(`Kategori "${dto.name}" sudah ada`); // kode HTTP 409
    }
    return this.prisma.category.create({ data: dto });
  }

  async update(id: number, dto: UpdateCategoryDto) {
    await this.pastikanAda(id);
    return this.prisma.category.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.pastikanAda(id);
    // Aturan bisnis: kategori yang masih punya produk tidak boleh dihapus
    const jumlahProduk = await this.prisma.product.count({ where: { categoryId: id } });
    if (jumlahProduk > 0) {
      throw new ConflictException(
        `Kategori masih memiliki ${jumlahProduk} produk, pindahkan atau hapus produknya dulu`,
      );
    }
    await this.prisma.category.delete({ where: { id } });
    return { message: `Kategori ${id} berhasil dihapus` };
  }

  // Fungsi bantu (private = hanya dipakai di dalam class ini)
  private async pastikanAda(id: number) {
    const kategori = await this.prisma.category.findUnique({ where: { id } });
    if (!kategori) {
      throw new NotFoundException(`Kategori dengan id ${id} tidak ditemukan`); // kode HTTP 404
    }
    return kategori;
  }
}