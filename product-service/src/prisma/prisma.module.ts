import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// @Global() = module ini otomatis tersedia di seluruh aplikasi,
// jadi module lain tidak perlu meng-import-nya satu per satu
@Global()
@Module({
  providers: [PrismaService], // daftar service yang dibuat oleh module ini
  exports: [PrismaService],   // service yang boleh dipakai module lain
})
export class PrismaModule {}