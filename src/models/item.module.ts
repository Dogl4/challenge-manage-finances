import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ItemController } from '../controllers/item.controller';
import { itemProviders } from '../providers/item.providers';
import { ItemService } from '../services/item.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ItemController],
  providers: [...itemProviders, ItemService],
})
export class ItemModule {}
