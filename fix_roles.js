const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany({
    where: {
      roles: {
        contains: 'ADMIN' // Find users who have ADMIN, maybe their SUPPER ADMIN was stripped
      }
    }
  })

  // We should restore SUPPER ADMIN to the first user or the user they edited (probably idUser = 1)
  for (const u of users) {
    if (u.idUser === 1 || u.roles === '["ADMIN"]') {
      await prisma.user.update({
        where: { idUser: u.idUser },
        data: {
          roles: '["SUPPER ADMIN", "ADMIN"]'
        }
      })
      console.log(`Restored SUPPER ADMIN to user ${u.name} (ID: ${u.idUser})`);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
