import { Module } from '@nestjs/common';
import { ItemModule } from './item.module';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, ItemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
