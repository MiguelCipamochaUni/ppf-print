import prisma from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { name, email, password } = await req.json();

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashed,
    },
  });

  return Response.json({ user });
}
