import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('MICROSERVICE')
    private readonly client: ClientProxy,
  ) {}

  @Get()
  async findAll() {
    return await this.client.send({ cmd: 'product_findAll' }, {}).toPromise();
  }

  @Get(':id')
  async find(@Param('id') id) {
    return await this.client.send({ cmd: 'product_find' }, id).toPromise();
  }

  @Post()
  async create(@Body() data) {
    try {
      return await this.client
        .send({ cmd: 'product_create' }, data)
        .toPromise();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async upate(@Body() data, @Param('id') id) {
    try {
      return await this.client
        .send({ cmd: 'product_update' }, { data, id })
        .toPromise();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async destroy(@Param('id') id) {
    try {
      return await this.client.send({ cmd: 'product_destroy' }, id).toPromise();
    } catch (error) {
      throw new HttpException(
        'No product found with given id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
