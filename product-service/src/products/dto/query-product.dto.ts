import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class QueryProductDto {
  @ApiPropertyOptional({ description: 'Cari berdasarkan nama produk' })
  @IsOptional() @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Tampilkan produk dari satu kategori saja' })
  @IsOptional()
  @Type(() => Number)  // nilai dari URL selalu teks, ubah dulu jadi angka
  @IsInt()
  categoryId?: number;

  @ApiPropertyOptional({ default: 1, description: 'Nomor halaman' })
  @IsOptional() @Type(() => Number) @IsInt() @Min(1)
  page?: number = 1;      // kalau tidak diisi, otomatis 1

  @ApiPropertyOptional({ default: 12, description: 'Jumlah produk per halaman (maks. 50)' })
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(50)
  limit?: number = 12;
}