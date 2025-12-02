const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  console.log("🗑️  Clearing existing data...");
  await prisma.favorite.deleteMany();
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  console.log("👥 Creating users...");
  const users = await prisma.user.createMany({
    data: [
      { username: "noob_master555" },
      { username: "sleepy_potato" },
      { username: "chicken_lord69" },
    ],
  });
  console.log(`✅ Created ${users.count} users`);

  // Get created users
  const createdUsers = await prisma.user.findMany();

  // Create Properties
  console.log("🏠 Creating properties...");
  const properties = await prisma.property.createMany({
    data: [
      {
        title: "Luxury Condo in Downtown",
        imageUrl:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        location: "Bangkok, Thailand",
        price: 8500000,
      },
      {
        title: "Modern Villa with Pool",
        imageUrl:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        location: "Phuket, Thailand",
        price: 25000000,
      },
      {
        title: "Cozy Apartment Near BTS",
        imageUrl:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
        location: "Bangkok, Thailand",
        price: 3500000,
      },
      {
        title: "Beachfront House",
        imageUrl:
          "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800",
        location: "Hua Hin, Thailand",
        price: 18000000,
      },
      {
        title: "Penthouse Suite",
        imageUrl:
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
        location: "Bangkok, Thailand",
        price: 45000000,
      },
      {
        title: "Garden House",
        imageUrl:
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
        location: "Chiang Mai, Thailand",
        price: 12000000,
      },
      {
        title: "Studio Apartment",
        imageUrl:
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
        location: "Bangkok, Thailand",
        price: 2500000,
      },
      {
        title: "Luxury Townhouse",
        imageUrl:
          "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800",
        location: "Bangkok, Thailand",
        price: 15000000,
      },
      {
        title: "Mountain View Villa",
        imageUrl:
          "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800",
        location: "Chiang Mai, Thailand",
        price: 22000000,
      },
      {
        title: "Riverside Condo",
        imageUrl:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
        location: "Bangkok, Thailand",
        price: 6500000,
      },
    ],
  });
  console.log(`✅ Created ${properties.count} properties`);

  // Get created properties
  const createdProperties = await prisma.property.findMany();

  // Create some Favorites (randomly assign)
  console.log("❤️  Creating favorites...");
  const favorites = [];

  // User 1 favorites property 1, 3, 5
  favorites.push({
    userId: createdUsers[0].id,
    propertyId: createdProperties[0].id,
  });
  favorites.push({
    userId: createdUsers[0].id,
    propertyId: createdProperties[2].id,
  });
  favorites.push({
    userId: createdUsers[0].id,
    propertyId: createdProperties[4].id,
  });

  // User 2 favorites property 2, 4
  favorites.push({
    userId: createdUsers[1].id,
    propertyId: createdProperties[1].id,
  });
  favorites.push({
    userId: createdUsers[1].id,
    propertyId: createdProperties[3].id,
  });

  // User 3 favorites property 1, 6, 7
  favorites.push({
    userId: createdUsers[2].id,
    propertyId: createdProperties[0].id,
  });
  favorites.push({
    userId: createdUsers[2].id,
    propertyId: createdProperties[5].id,
  });
  favorites.push({
    userId: createdUsers[2].id,
    propertyId: createdProperties[6].id,
  });

  await prisma.favorite.createMany({
    data: favorites,
  });
  console.log(`✅ Created ${favorites.length} favorites`);

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
