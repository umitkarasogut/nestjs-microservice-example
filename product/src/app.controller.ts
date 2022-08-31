import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Product } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'product_findAll' })
  findAll(): Promise<Product[] | []> {
    return this.appService.findAll();
  }

  @MessagePattern({ cmd: 'product_find' })
  find(id: string): Promise<Product | null> {
    return this.appService.find(id);
  }

  @MessagePattern({ cmd: 'product_create' })
  create(data: Product): Promise<Product | Error> {
    return this.appService.create(data);
  }

  @MessagePattern({ cmd: 'product_update' })
  update(data): Promise<Product | Error> {
    const { id, ...updatedData } = data;
    return this.appService.update(id, updatedData.data);
  }

  @MessagePattern({ cmd: 'product_destroy' })
  destroy(id: string): Promise<Product | null> {
    return this.appService.destroy(id);
  }
}
