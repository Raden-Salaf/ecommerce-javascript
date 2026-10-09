import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// @Controller() = tandai class ini sebagai penerima request.
// Kosong berarti alamat dasarnya "/".
@Controller()
export class AppController {
  // Constructor ini meminta NestJS menyediakan AppService otomatis.
  // Teknik ini bernama "dependency injection": kita tidak membuat sendiri, NestJS yang memberi.
  constructor(private readonly appService: AppService) {}

  // @Get() = tangani request GET ke alamat "/"
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('health') = tangani request GET ke alamat "/health"
  @Get('health')
  getHealth() {
    // NestJS otomatis mengubah objek ini menjadi JSON
    return { service: 'product-service', status: 'ok' };
  }
}