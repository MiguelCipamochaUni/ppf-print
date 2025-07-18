import { PrismaClient } from "@prisma/client";

let prisma;

// Evita crear múltiples instancias de Prisma en desarrollo (por Hot Reload de Next.js)
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
