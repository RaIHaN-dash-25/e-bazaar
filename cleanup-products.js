const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {

  const keepProducts = [
    "prod_1",
    "prod_2",
    "prod_3",
    "prod_4",
    "prod_5",
    "prod_6",
    "prod_7",
    "prod_8",
    "prod_9",
    "prod_10",
    "prod_11",
    "prod_12",
  ];

  // Find products that will be deleted
  const productsToDelete = await prisma.product.findMany({
    where: {
      id: {
        notIn: keepProducts,
      },
    },
    select: {
      id: true,
    },
  });

  const productIds = productsToDelete.map((p) => p.id);

  // Delete order items connected to those products
  const deletedOrderItems = await prisma.orderItem.deleteMany({
    where: {
      productId: {
        in: productIds,
      },
    },
  });

  // Delete products
  const deletedProducts = await prisma.product.deleteMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  console.log(`Deleted ${deletedOrderItems.count} order items`);
  console.log(`Deleted ${deletedProducts.count} products`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });