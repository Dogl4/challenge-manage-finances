import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from '../controllers/user.controller';
import { userProviders } from '../providers/user.providers';
import { UserService } from '../services/user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
})
export class UserModule {}
