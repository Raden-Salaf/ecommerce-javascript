import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Panci Anti Lengket 24 cm' })
  @IsString() @IsNotEmpty() @MaxLength(191)
  name!: string;

  @ApiPropertyOptional({ example: 'Panci berlapis anti lengket, cocok untuk semua jenis kompor' })
  @IsOptional()     // boleh tidak dikirim
  @IsString()
  description?: string;   // tanda "?" = field opsional

  @ApiProperty({ example: 149000, description: 'Harga dalam rupiah (bilangan bulat)' })
  @IsInt()          // harus bilangan bulat
  @Min(0)           // tidak boleh negatif
  price!: number;

  @ApiProperty({ example: 25 })
  @IsInt() @Min(0)
  stock!: number;

  @ApiPropertyOptional({ example: 'https://contoh.com/panci.jpg' })
  @IsOptional() @IsString() @MaxLength(191)
  imageUrl?: string;

  @ApiProperty({ example: 1, description: 'ID kategori yang sudah ada' })
  @IsInt()
  categoryId!: number;
}