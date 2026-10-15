import {
  Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('Produk')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()   // GET /products?search=...&categoryId=...&page=...&limit=...
  findAll(@Query() query: QueryProductDto) {   // @Query = ambil parameter dari alamat URL
    return this.productsService.findAll(query);
  }

  @Get(':id')   // GET /products/5
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()   // POST /products
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Put(':id')   // PUT /products/5
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')   // DELETE /products/5
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}