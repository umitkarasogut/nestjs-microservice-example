import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

describe('ProductMsAppService', () => {
  let service: AppService;
  const product = {
    id: 'test-product-id',
    name: 'Example Test Product!',
    price: '100$',
    image: 'image-url',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);

    await service.create(product);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('findAll method', async () => {
    const promise = service.findAll();
    const products = await promise;

    expect(!!promise && typeof promise.then === 'function').toBe(true);
    expect(products).toBeInstanceOf(Array);
    expect(products).toContainEqual(product);
  });

  test('find method', async () => {
    const promise = service.find(product.id);
    const findedProduct = await promise;

    expect(!!promise && typeof promise.then === 'function').toBe(true);
    expect(findedProduct).toStrictEqual(product);
  });

  test('update method', async () => {
    const newProductCredentials = {
      name: 'new name',
      price: '100',
      image: 'test-image-url',
    };
    const promise = service.update(product.id, newProductCredentials);
    const updatedProduct = await promise;

    expect(!!promise && typeof promise.then === 'function').toBe(true);
    expect(updatedProduct).toStrictEqual({
      id: product.id,
      ...newProductCredentials,
    });
  });

  test('destroy method', async () => {
    const promise = service.destroy(product.id);
    //const result = await promise;
    await promise;
    const products = await service.findAll();

    expect(!!promise && typeof promise.then === 'function').toBe(true);
    //expect(result).toEqual(product);
    expect(products).not.toContainEqual(product);
  });
});
