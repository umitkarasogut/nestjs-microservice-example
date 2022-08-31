import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  constructor(private readonly dbService: DatabaseService) {}

  findAll(): Promise<Product[] | []> {
    return this.dbService.product.findMany();
  }

  find(id: string): Promise<Product | null> {
    return this.dbService.product.findUnique({ where: { id } });
  }

  create(data: Product): Promise<Product | Error> {
    return this.dbService.product.create({ data });
  }

  update(id: string, data): Promise<Product | Error> {
    return this.dbService.product.update({ where: { id }, data });
  }

  destroy(id: string) {
    return this.dbService.product.delete({ where: { id } });
  }
}
