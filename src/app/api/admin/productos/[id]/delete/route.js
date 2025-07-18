import db from "@/lib/db";

export async function POST(_, { params }) {
  const { id } = params;

  await db.product.delete({
    where: { id },
  });

  return Response.json({ ok: true });
}
