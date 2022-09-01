import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('ProductServiceIntegration (e2e)', () => {
  let app: INestApplication;
  let exampleProduct;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/product (GET)', () =>
    request(app.getHttpServer())
      .get('/product')
      .expect(200)
      .expect((response) => {
        expect(response.body).toBeInstanceOf(Array);
        exampleProduct = response.body[0];
      }));

  it('/product/{id} (GET)', () =>
    request(app.getHttpServer())
      .get(`/product/${exampleProduct.id}`)
      .expect(200)
      .expect((response) => {
        expect(response.body).toStrictEqual(exampleProduct);
      }));

  it('/product (POST)', () =>
    request(app.getHttpServer())
      .post('/product')
      .send({
        name: 'e2e test product name',
        price: '100',
        image: 'test-url-image',
      })
      .expect(201));

  it('/product/{id} (PUT)', () => {
    const newCredentials = {
      id: exampleProduct.id,
      name: 'new e2e test product name',
      price: '1200',
      image: 'new test-url-image',
    };

    return request(app.getHttpServer())
      .put(`/product/${exampleProduct.id}`)
      .send(newCredentials)
      .expect(200)
      .expect((response) => {
        expect(response.body).toStrictEqual(newCredentials);
      });
  });

  it('/product/{id} (DELETE)', () =>
    request(app.getHttpServer())
      .delete(`/product/${exampleProduct.id}`)
      .expect(200));

  afterAll((done) => {
    app.close();
    done();
  });
});
