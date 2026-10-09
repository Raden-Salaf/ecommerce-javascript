import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Membuat aplikasi NestJS dari modul utama
  const app = await NestFactory.create(AppModule);

  // Menyalakan server di port 3002.
  // "??" artinya: pakai nilai PORT dari environment kalau ada, kalau tidak pakai 3002.
  // Nanti Docker bisa mengatur PORT ini tanpa kita ubah kode.
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap(); // jalankan fungsi di atas