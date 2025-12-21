import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL || "admin@neosite.digital";
  const password = process.env.SEED_ADMIN_PASSWORD || "admin123";
  const hash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash: hash,
      name: "Admin",
    },
  });

  console.log(`Seeded admin user ${email} with password ${password}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
