import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ValidationPipe = "satpam" data. Semua request diperiksa sesuai aturan di DTO.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // buang field yang tidak ada di DTO
      forbidNonWhitelisted: true, // lebih tegas: tolak request yang membawa field asing
      transform: true,            // ubah tipe data otomatis sesuai DTO
    }),
  );

  // CORS: izin bagi website (frontend di port 5173) untuk memanggil API ini.
  // Tanpa ini, browser memblokir request dari port yang berbeda.
  app.enableCors();

  // Pengaturan halaman dokumentasi Swagger
  const config = new DocumentBuilder()
    .setTitle('Product Service - Bakul-Soax')
    .setDescription('API untuk produk dan kategori')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // dibuka di http://localhost:3002/docs

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap(); // kalau di file aslimu baris terakhir ini tertulis berbeda (misal "void bootstrap();"), pertahankan versi aslimu