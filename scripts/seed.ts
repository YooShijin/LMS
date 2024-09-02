 const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "NEET" },
        { name: "JEE" },
        { name: "Bihar Board" },
        { name: "CDS" },
        { name: "NDA" },
      ],
    });
    console.log("Success");
  } catch (err) {
    console.log("Error seeding the database categories", err);
  } finally {
    await database.$disconnect();
  }
}

main();
