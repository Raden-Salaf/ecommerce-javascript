import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// @Injectable() = class ini boleh disediakan NestJS ke class lain (dependency injection)
@Injectable()
// "extends PrismaClient" = PrismaService mewarisi semua kemampuan PrismaClient,
// jadi nanti kita bisa menulis this.prisma.product.findMany() dll.
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // Dijalankan otomatis saat aplikasi menyala: buka koneksi ke database
  async onModuleInit() {
    await this.$connect();
  }

  // Dijalankan otomatis saat aplikasi dimatikan: tutup koneksi dengan rapi
  async onModuleDestroy() {
    await this.$disconnect();
  }
}