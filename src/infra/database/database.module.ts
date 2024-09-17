import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/user/repositories/user.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useFactory(prismaService: PrismaService) {
        return new UserRepository(prismaService);
      },
      inject: [PrismaService],
    },
  ],
  exports: [
    UserRepository,
  ],
})
export class DatabaseModule {}
