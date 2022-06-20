import { Module } from '@nestjs/common';
import {ProductsController} from './products.controller';
import {UserController} from './user.controller';
import {UserModule} from '../user/user.module';
import {ProductsModule} from '../products/products.module';
import {StreamerModule} from '../streamer/streamer.module';
import { StreamerService } from '../streamer/streamer.service';
import {UserService} from '../user/user.service';
import {ProductsService} from '../products/products.service';

@Module({
  controllers: [ProductsController, UserController],
  providers: [StreamerService, UserService, ProductsService],
  imports: [UserModule, ProductsModule, StreamerModule],
})
export class ApiModule {}
