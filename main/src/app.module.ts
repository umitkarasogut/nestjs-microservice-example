import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'tcp-services', transport: Transport.TCP },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
