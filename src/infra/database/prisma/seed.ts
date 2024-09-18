import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.user.upsert({
    where: { id: '21071cea-d173-4ea8-9042-875e09413600' },
    update: {},
    create: {
      id: '21071cea-d173-4ea8-9042-875e09413600',
      email: 'admin@admin.com',
      password: '$2a$10$NbphmQbngTSIjK/pB5Ag4eeNuZHWkPgf5EMeTFnmdOl/Xh6S2.XpG',
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
