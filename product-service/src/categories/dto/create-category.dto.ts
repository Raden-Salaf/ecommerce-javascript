import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  // @ApiProperty = tampil di Swagger beserta contoh isinya
  @ApiProperty({ example: 'Dapur' })
  @IsString()      // harus berupa teks
  @IsNotEmpty()    // tidak boleh kosong
  @MaxLength(100)  // maksimal 100 karakter
  name!: string;   // tanda "!" = "tenang TypeScript, nilainya pasti diisi oleh request"
}