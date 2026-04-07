const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE user ADD COLUMN isActive BOOLEAN DEFAULT true;`);
    console.log("Column isActive added safely.");
  } catch (e) {
    console.error("Column might already exist or error:", e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
