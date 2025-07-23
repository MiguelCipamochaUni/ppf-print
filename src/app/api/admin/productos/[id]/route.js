import db from "@/lib/db";

export async function GET(_, { params }) {
  const paramsId = await params.id;

  const producto = await db.product.findUnique({
    where: { id: paramsId },
  });
  return Response.json(producto);
}
