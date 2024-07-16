import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DbModule } from 'src/db/db.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [DbModule],
  controllers: [UserController],
  providers: [UserRepository],
})
export class UserModule {}
