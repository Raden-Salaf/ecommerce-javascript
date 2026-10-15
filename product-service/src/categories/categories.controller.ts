import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Kategori')            // pengelompokan di halaman Swagger
@Controller('categories')       // semua alamat di class ini diawali /categories
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()                        // GET /categories
  findAll() {
    return this.categoriesService.findAll();
  }

  @Post()                       // POST /categories
  create(@Body() dto: CreateCategoryDto) {   // @Body = ambil isi request
    return this.categoriesService.create(dto);
  }

  @Put(':id')                   // PUT /categories/3  (":id" = bagian yang berubah-ubah)
  update(
    @Param('id', ParseIntPipe) id: number,   // ambil "3" dari alamat dan ubah jadi angka 3
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')                // DELETE /categories/3
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}