const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');

const prisma = new PrismaClient();

async function main() {
  try {
    const email = "nambinintsoadonah6467@gmail.com";
    
    const existingUser = await prisma.user.findFirst({
        where: { email }
    });

    if (existingUser) {
        console.log("User already exists!");
        return;
    }

    const hashedPassword = await argon2.hash("123456");

    const newUser = await prisma.user.create({
      data: {
        name: "NAMBININTSOA",
        surname: "Donah",
        email: email,
        password: hashedPassword,
        cin: "312 031 015 351",
        logo: "string",
        lieu: "AZ 75 AI Anosizato Ouest",
        roles: ["SUPPER ADMIN"].join(', '),
      },
    });

    console.log("Admin user created successfully:");
    console.log(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
