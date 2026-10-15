import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

// PartialType = salin semua field CreateCategoryDto tapi semuanya menjadi opsional.
// Saat mengubah data, kita boleh mengirim sebagian field saja.
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}