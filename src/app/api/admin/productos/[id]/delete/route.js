import db from "@/lib/db";

export async function DELETE(_, { params }) {
  const { id } = await params;

  await db.product.delete({
    where: { id },
  });

  return Response.json({ ok: true });
}
