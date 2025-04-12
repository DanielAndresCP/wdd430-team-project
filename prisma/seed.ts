// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  //  .d8888b.             888                                            d8b
  // d88P  Y88b            888                                            Y8P
  // 888    888            888
  // 888          8888b.   888888   .d88b.    .d88b.    .d88b.   888d888  888   .d88b.   .d8888b
  // 888             "88b  888     d8P  Y8b  d88P"88b  d88""88b  888P"    888  d8P  Y8b  88K
  // 888    888  .d888888  888     88888888  888  888  888  888  888      888  88888888  "Y8888b.
  // Y88b  d88P  888  888  Y88b.   Y8b.      Y88b 888  Y88..88P  888      888  Y8b.           X88
  //  "Y8888P"   "Y888888   "Y888   "Y8888    "Y88888   "Y88P"   888      888   "Y8888    88888P'
  //                                              888
  //                                         Y8b d88P
  //                                          "Y88P"
  await prisma.category.deleteMany({});

  await prisma.category.create({ data: { displayName: "Woodworking" } });
  await prisma.category.create({ data: { displayName: "Pottery" } });
  await prisma.category.create({ data: { displayName: "Leathercraft" } });
  await prisma.category.create({ data: { displayName: "Glassblowing" } });
  await prisma.category.create({ data: { displayName: "Metalworking" } });
  await prisma.category.create({ data: { displayName: "Textile Arts" } });
  await prisma.category.create({ data: { displayName: "Calligraphy" } });
  await prisma.category.create({ data: { displayName: "Bookbinding" } });
  await prisma.category.create({ data: { displayName: "Basket Weaving" } });
  await prisma.category.create({ data: { displayName: "Stone Carving" } });

  console.log("✅ Categorias creadas correctamente");

  // 888     888
  // 888     888
  // 888     888
  // 888     888  .d8888b    .d88b.   888d888  .d8888b
  // 888     888  88K       d8P  Y8b  888P"    88K
  // 888     888  "Y8888b.  88888888  888      "Y8888b.
  // Y88b. .d88P       X88  Y8b.      888           X88
  //  "Y88888P"    88888P'   "Y8888   888       88888P'

  const hashedPassword = await bcrypt.hash("test123", 10);

  await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      name: "Test User",
      password: hashedPassword,
      profilePictureUrl: "/placeholder.png"
    },
  });

  await prisma.user.upsert({
    where: { email: "johnwood@example.com" },
    update: {},
    create: {
      role: "SELLER",
      profilePictureUrl: "/creators/john-wood.png",
      settings: {
        shortBio:
          "I like making some cool wooden spoons, this is some lorem ipsum dolor sit amet, some more lorem ipsum dolor sit amet, and even more lorem ipsum dolor sit amet",
        fullBio:
          "'I still remember the first time I carved a wooden spoon. It was a rainy afternoon, and I was sitting in my grandfather’s old workshop, watching him work on a chair. I found a small scrap of wood, picked up a carving knife, and started whittling. The result was rough, uneven, and barely functional—but I was hooked.\nGrowing up, I was always drawn to working with my hands. Whether it was fixing things around the house or sketching out ideas for small projects, I loved the process of creating something from nothing. But it wasn’t until years later, after working an unfulfilling office job, that I decided to turn my passion into my life’s work.\nWoodworking, for me, is more than just a craft—it’s a way of connecting with nature and tradition. I work primarily with locally sourced hardwoods, shaping each piece with care and patience. From sturdy farmhouse tables to delicate hand-carved spoons, I aim to create pieces that are not just functional but also full of character.\nA lot of my inspiration comes from old-world craftsmanship. I admire the way traditional artisans built things to last, with careful joinery and an eye for detail. Every time I pick up my tools, I strive to honor that legacy, making furniture and kitchenware that will stand the test of time.\nOne of the most rewarding parts of my work is knowing that my pieces become part of people’s daily lives. A wooden spoon stirring a family meal, a dining table where stories are shared—these objects carry memories, and that’s what makes them special.\nMy journey as a woodworker has been one of learning, patience, and a deep appreciation for the material itself. Wood has a way of teaching you—about resilience, adaptability, and the beauty of imperfections. No two pieces are ever the same, and that’s what makes this craft so endlessly fascinating.\nWhether you’re here to browse my work or simply share a love for handmade craftsmanship, I’m grateful to have you along for the journey.'",
        specialties: [
          (
            await prisma.category.findFirst({
              where: { displayName: "Woodworking" },
            })
          )?.id || null,
        ],
      },
      email: "johnwood@example.com",
      name: "John Wood",
      password: hashedPassword,
    },
  });

  await prisma.user.upsert({
    where: { email: "anastasiaweaver@example.com" },
    update: {},
    create: {
      role: "SELLER",
      profilePictureUrl: "/creators/anastasia-weaver.png",
      settings: {
        shortBio:
          "I like making some cool woven baskets, this is some lorem ipsum dolor sit amet, some more lorem ipsum dolor sit amet, and even more lorem ipsum dolor sit amet",
        fullBio:
          "I still remember the first time I wove a basket. I was about ten, sitting beside my aunt under the old walnut tree in her backyard. She handed me a bundle of willow and showed me how to start the base. My first attempt was crooked and loose, but I couldn’t stop smiling—I was hooked.\nI’ve always been drawn to working with my hands. As a kid, I’d braid grasses, tinker with cords, or weave little mats out of whatever I could find. That tactile rhythm—over, under, over—felt natural. Years later, after feeling stuck behind a desk job, I returned to that rhythm and never looked back.\nBasket weaving, to me, is about more than crafting something useful. It’s about preserving a lineage of patience, technique, and respect for natural materials. I work with willow, cane, and even local vines, each chosen for its unique texture and strength. Every basket is shaped slowly, layer by layer, guided by tradition and instinct.\nMuch of my inspiration comes from folk designs and everyday utility. I’m fascinated by how different cultures wove distinct forms to meet their needs—fish traps, harvest baskets, cradleboards. I try to echo that blend of form and function in my own work, adding a personal touch to each piece.\nWhat I love most is how woven pieces quietly become part of people’s routines—a bread basket on the breakfast table, a foraging pouch on a weekend hike. They’re humble objects, but filled with intention and care.\nThis craft has taught me patience, respect for materials, and how beauty often hides in the simplest patterns. No two baskets are ever quite the same, and that’s exactly why I keep weaving.",
        specialties: [
          (
            await prisma.category.findFirst({
              where: { displayName: "Basket Weaving" },
            })
          )?.id || null,
        ],
      },
      email: "anastasiaweaver@example.com",
      name: "Anastasia Weaver",
      password: hashedPassword,
    },
  });

  console.log("✅ Usuarios creado correctamente");

  // 8888888b.                           888                      888
  // 888   Y88b                          888                      888
  // 888    888                          888                      888
  // 888   d88P  888d888   .d88b.    .d88888  888  888   .d8888b  888888  .d8888b
  // 8888888P"   888P"    d88""88b  d88" 888  888  888  d88P"     888     88K
  // 888         888      888  888  888  888  888  888  888       888     "Y8888b.
  // 888         888      Y88..88P  Y88b 888  Y88b 888  Y88b.     Y88b.        X88
  // 888         888       "Y88P"    "Y88888   "Y88888   "Y8888P   "Y888   88888P'
  await prisma.product.deleteMany({});

  // -------------- Spoons
  await prisma.product.create({
    data: {
      description: "This is a cool wooden spoon",
      imageUrl: "/products/spoon.png",
      price: 5,
      title: "Wooden Spoon",
      categoryId:
        (
          await prisma.category.findFirst({
            where: { displayName: "Woodworking" },
          })
        )?.id || "asd",
      sellerId:
        (
          await prisma.user.findFirst({
            where: { email: "johnwood@example.com" },
          })
        )?.id || "",
    },
  });
  await prisma.product.create({
    data: {
      description: "A finely crafted maple spoon",
      imageUrl: "/products/spoon.png",
      price: 6,
      title: "Maple Spoon",
      categoryId:
        (
          await prisma.category.findFirst({
            where: { displayName: "Woodworking" },
          })
        )?.id || "asd",
      sellerId:
        (
          await prisma.user.findFirst({
            where: { email: "johnwood@example.com" },
          })
        )?.id || "",
    },
  });
  await prisma.product.create({
    data: {
      description: "A sleek bamboo spoon",
      imageUrl: "/products/spoon.png",
      price: 7,
      title: "Bamboo Spoon",
      categoryId:
        (
          await prisma.category.findFirst({
            where: { displayName: "Woodworking" },
          })
        )?.id || "asd",
      sellerId:
        (
          await prisma.user.findFirst({
            where: { email: "johnwood@example.com" },
          })
        )?.id || "",
    },
  });
  await prisma.product.create({
    data: {
      description: "A charming cherry spoon",
      imageUrl: "/products/spoon.png",
      price: 8,
      title: "Cherry Spoon",
      categoryId:
        (
          await prisma.category.findFirst({
            where: { displayName: "Woodworking" },
          })
        )?.id || "asd",
      sellerId:
        (
          await prisma.user.findFirst({
            where: { email: "johnwood@example.com" },
          })
        )?.id || "",
    },
  });
  await prisma.product.create({
    data: {
      description: "A robust oak spoon",
      imageUrl: "/products/spoon.png",
      price: 9,
      title: "Oak Spoon",
      categoryId:
        (
          await prisma.category.findFirst({
            where: { displayName: "Woodworking" },
          })
        )?.id || "asd",
      sellerId:
        (
          await prisma.user.findFirst({
            where: { email: "johnwood@example.com" },
          })
        )?.id || "",
    },
  });
  await prisma.product.create({
    data: {
      description: "A premium walnut spoon",
      imageUrl: "/products/spoon.png",
      price: 10,
      title: "Walnut Spoon",
      categoryId:
        (
          await prisma.category.findFirst({
            where: { displayName: "Woodworking" },
          })
        )?.id || "asd",
      sellerId:
        (
          await prisma.user.findFirst({
            where: { email: "johnwood@example.com" },
          })
        )?.id || "",
    },
  });

  // -------------- Baskets
  await prisma.product.create({
    data: {
      description: "The classig picnic basket",
      imageUrl: "/products/picnic-basket.png",
      price: 7,
      title: "Picnic Basket",
      categoryId:
        (
          await prisma.category.findFirst({
            where: { displayName: "Basket Weaving" },
          })
        )?.id || "asd",
      sellerId:
        (
          await prisma.user.findFirst({
            where: { email: "anastasiaweaver@example.com" },
          })
        )?.id || "",
    },
  });
  await prisma.product.create({
    data: {
      description: "A spacious large picnic basket",
      imageUrl: "/products/picnic-basket.png",
      price: 8,
      title: "Large Picnic Basket",
      categoryId:
        (
          await prisma.category.findFirst({
            where: { displayName: "Basket Weaving" },
          })
        )?.id || "asd",
      sellerId:
        (
          await prisma.user.findFirst({
            where: { email: "anastasiaweaver@example.com" },
          })
        )?.id || "",
    },
  });
  await prisma.product.create({
    data: {
      description: "A modern stylish picnic basket",
      imageUrl: "/products/picnic-basket.png",
      price: 9,
      title: "Modern Picnic Basket",
      categoryId:
        (
          await prisma.category.findFirst({
            where: { displayName: "Basket Weaving" },
          })
        )?.id || "asd",
      sellerId:
        (
          await prisma.user.findFirst({
            where: { email: "anastasiaweaver@example.com" },
          })
        )?.id || "",
    },
  });
  await prisma.product.create({
    data: {
      description: "A beautifully handwoven picnic basket",
      imageUrl: "/products/picnic-basket.png",
      price: 10,
      title: "Handwoven Picnic Basket",
      categoryId:
        (
          await prisma.category.findFirst({
            where: { displayName: "Basket Weaving" },
          })
        )?.id || "asd",
      sellerId:
        (
          await prisma.user.findFirst({
            where: { email: "anastasiaweaver@example.com" },
          })
        )?.id || "",
    },
  });
  await prisma.product.create({
    data: {
      description: "An elegant picnic basket for outings",
      imageUrl: "/products/picnic-basket.png",
      price: 11,
      title: "Elegant Picnic Basket",
      categoryId:
        (
          await prisma.category.findFirst({
            where: { displayName: "Basket Weaving" },
          })
        )?.id || "asd",
      sellerId:
        (
          await prisma.user.findFirst({
            where: { email: "anastasiaweaver@example.com" },
          })
        )?.id || "",
    },
  });
  await prisma.product.create({
    data: {
      description: "A vintage style picnic basket",
      imageUrl: "/products/picnic-basket.png",
      price: 12,
      title: "Vintage Picnic Basket",
      categoryId:
        (
          await prisma.category.findFirst({
            where: { displayName: "Basket Weaving" },
          })
        )?.id || "asd",
      sellerId:
        (
          await prisma.user.findFirst({
            where: { email: "anastasiaweaver@example.com" },
          })
        )?.id || "",
    },
  });

  console.log("✅ Productos creadas correctamente");

  // 8888888b.                       d8b
  // 888   Y88b                      Y8P
  // 888    888
  // 888   d88P   .d88b.   888  888  888   .d88b.   888  888  888  .d8888b
  // 8888888P"   d8P  Y8b  888  888  888  d8P  Y8b  888  888  888  88K
  // 888 T88b    88888888  Y88  88P  888  88888888  888  888  888  "Y8888b.
  // 888  T88b   Y8b.       Y8bd8P   888  Y8b.      Y88b 888 d88P       X88
  // 888   T88b   "Y8888     Y88P    888   "Y8888    "Y8888888P"    88888P'
  await prisma.review.deleteMany({});

  await prisma.review.create({
    data: {
      rating: 5,
      userId:
        (
          await prisma.user.findFirst({
            where: { email: "johnwood@example.com" },
          })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({ where: { title: "Wooden Spoon" } })
        )?.id || "asd",
      comment: "Excellent!",
    },
  });
  await prisma.review.create({
    data: {
      rating: 4,
      userId:
        (
          await prisma.user.findFirst({ where: { email: "test@example.com" } })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({ where: { title: "Picnic Basket" } })
        )?.id || "asd",
      comment: "",
    },
  });
  await prisma.review.create({
    data: {
      rating: 3,
      userId:
        (
          await prisma.user.findFirst({
            where: { email: "anastasiaweaver@example.com" },
          })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({ where: { title: "Maple Spoon" } })
        )?.id || "asd",
      comment: "Good quality",
    },
  });
  await prisma.review.create({
    data: {
      rating: 2,
      userId:
        (
          await prisma.user.findFirst({
            where: { email: "johnwood@example.com" },
          })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({ where: { title: "Bamboo Spoon" } })
        )?.id || "asd",
      comment: "Could be better",
    },
  });
  await prisma.review.create({
    data: {
      rating: 5,
      userId:
        (
          await prisma.user.findFirst({ where: { email: "test@example.com" } })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({ where: { title: "Cherry Spoon" } })
        )?.id || "asd",
      comment: "Loved it!",
    },
  });
  await prisma.review.create({
    data: {
      rating: 4,
      userId:
        (
          await prisma.user.findFirst({
            where: { email: "anastasiaweaver@example.com" },
          })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({ where: { title: "Oak Spoon" } })
        )?.id || "asd",
      comment: "",
    },
  });
  await prisma.review.create({
    data: {
      rating: 3,
      userId:
        (
          await prisma.user.findFirst({
            where: { email: "johnwood@example.com" },
          })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({ where: { title: "Walnut Spoon" } })
        )?.id || "asd",
      comment: "Satisfactory",
    },
  });
  await prisma.review.create({
    data: {
      rating: 2,
      userId:
        (
          await prisma.user.findFirst({ where: { email: "test@example.com" } })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({
            where: { title: "Large Picnic Basket" },
          })
        )?.id || "asd",
      comment: "Not as expected",
    },
  });
  await prisma.review.create({
    data: {
      rating: 5,
      userId:
        (
          await prisma.user.findFirst({
            where: { email: "anastasiaweaver@example.com" },
          })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({
            where: { title: "Modern Picnic Basket" },
          })
        )?.id || "asd",
      comment: "Fantastic design",
    },
  });
  await prisma.review.create({
    data: {
      rating: 4,
      userId:
        (
          await prisma.user.findFirst({
            where: { email: "johnwood@example.com" },
          })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({
            where: { title: "Handwoven Picnic Basket" },
          })
        )?.id || "asd",
      comment: "",
    },
  });
  await prisma.review.create({
    data: {
      rating: 3,
      userId:
        (
          await prisma.user.findFirst({ where: { email: "test@example.com" } })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({
            where: { title: "Elegant Picnic Basket" },
          })
        )?.id || "asd",
      comment: "Pretty good",
    },
  });
  await prisma.review.create({
    data: {
      rating: 2,
      userId:
        (
          await prisma.user.findFirst({
            where: { email: "anastasiaweaver@example.com" },
          })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({
            where: { title: "Vintage Picnic Basket" },
          })
        )?.id || "asd",
      comment: "Could improve",
    },
  });
  await prisma.review.create({
    data: {
      rating: 5,
      userId:
        (
          await prisma.user.findFirst({
            where: { email: "johnwood@example.com" },
          })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({ where: { title: "Wooden Spoon" } })
        )?.id || "asd",
      comment: "My favorite!",
    },
  });
  await prisma.review.create({
    data: {
      rating: 4,
      userId:
        (
          await prisma.user.findFirst({ where: { email: "test@example.com" } })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({ where: { title: "Picnic Basket" } })
        )?.id || "asd",
      comment: "",
    },
  });
  await prisma.review.create({
    data: {
      rating: 3,
      userId:
        (
          await prisma.user.findFirst({
            where: { email: "anastasiaweaver@example.com" },
          })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({ where: { title: "Maple Spoon" } })
        )?.id || "asd",
      comment: "Nice work",
    },
  });
  await prisma.review.create({
    data: {
      rating: 2,
      userId:
        (
          await prisma.user.findFirst({
            where: { email: "johnwood@example.com" },
          })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({ where: { title: "Bamboo Spoon" } })
        )?.id || "asd",
      comment: "",
    },
  });
  await prisma.review.create({
    data: {
      rating: 5,
      userId:
        (
          await prisma.user.findFirst({ where: { email: "test@example.com" } })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({ where: { title: "Cherry Spoon" } })
        )?.id || "asd",
      comment: "Perfect!",
    },
  });
  await prisma.review.create({
    data: {
      rating: 4,
      userId:
        (
          await prisma.user.findFirst({
            where: { email: "anastasiaweaver@example.com" },
          })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({ where: { title: "Oak Spoon" } })
        )?.id || "asd",
      comment: "Good job",
    },
  });
  await prisma.review.create({
    data: {
      rating: 3,
      userId:
        (
          await prisma.user.findFirst({
            where: { email: "johnwood@example.com" },
          })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({ where: { title: "Walnut Spoon" } })
        )?.id || "asd",
      comment: "",
    },
  });
  await prisma.review.create({
    data: {
      rating: 2,
      userId:
        (
          await prisma.user.findFirst({ where: { email: "test@example.com" } })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({
            where: { title: "Large Picnic Basket" },
          })
        )?.id || "asd",
      comment: "Meh",
    },
  });
  await prisma.review.create({
    data: {
      rating: 5,
      userId:
        (
          await prisma.user.findFirst({
            where: { email: "anastasiaweaver@example.com" },
          })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({
            where: { title: "Modern Picnic Basket" },
          })
        )?.id || "asd",
      comment: "Outstanding!",
    },
  });
  await prisma.review.create({
    data: {
      rating: 4,
      userId:
        (
          await prisma.user.findFirst({
            where: { email: "johnwood@example.com" },
          })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({
            where: { title: "Handwoven Picnic Basket" },
          })
        )?.id || "asd",
      comment: "",
    },
  });
  await prisma.review.create({
    data: {
      rating: 3,
      userId:
        (
          await prisma.user.findFirst({ where: { email: "test@example.com" } })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({
            where: { title: "Elegant Picnic Basket" },
          })
        )?.id || "asd",
      comment: "Decent",
    },
  });
  await prisma.review.create({
    data: {
      rating: 2,
      userId:
        (
          await prisma.user.findFirst({
            where: { email: "anastasiaweaver@example.com" },
          })
        )?.id || "asd",
      productId:
        (
          await prisma.product.findFirst({
            where: { title: "Vintage Picnic Basket" },
          })
        )?.id || "asd",
      comment: "",
    },
  });

  console.log("✅ Reseñas creadas correctamente");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
