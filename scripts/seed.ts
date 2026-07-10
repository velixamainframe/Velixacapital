import { db } from "../src/lib/db";
import { hashPassword } from "../src/lib/auth/session";

/* Seed only the requested admin account and remove demo/test data. */

async function main() {
  console.log("Seeding Velixa Capital database…");

  const demoEmails = ["admin@velixacapital.com", "employee@velixacapital.com", "priya@velixacapital.com", "partner@velixacapital.com"];
  const demoUsers = await db.user.findMany({ where: { email: { in: demoEmails } } });
  for (const user of demoUsers) {
    await db.employee.deleteMany({ where: { userId: user.id } }).catch(() => {});
    await db.partnerProfile.deleteMany({ where: { userId: user.id } }).catch(() => {});
  }
  await db.user.deleteMany({ where: { email: { in: demoEmails } } }).catch(() => {});

  await db.user.upsert({
    where: { email: "kumarvishes@gmail.com" },
    update: {
      passwordHash: hashPassword("Velkun@1555"),
      displayName: "Vishees Kumar",
      role: "admin",
      isActive: true,
    },
    create: {
      email: "kumarvishes@gmail.com",
      passwordHash: hashPassword("Velkun@1555"),
      displayName: "Vishees Kumar",
      role: "admin",
      isActive: true,
    },
  });

  console.log("Created/updated admin account for kumarvishes@gmail.com");
  console.log("Removed demo accounts and CRM demo records.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await db.$disconnect(); });
