import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { UserMapper } from "../mappers/user.mapper";
import { UserEntity } from "../entities/user.entity";

export class UserRepository {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async findUserByUser(email: string): Promise<UserEntity> {
        const result = await this.prisma.user.findFirst({
            where: {
                email,
                deletedAt: null
            }
        });

        if(!result) {
            return null;
        }

        return UserMapper.mapPrismaToEntity(result);
    }
}