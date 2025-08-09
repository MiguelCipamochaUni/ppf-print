import db from "@/lib/db";
export const dynamic = "force-dynamic";

export async function GET(_, { params }) {
  const paramsId = await params.id;

  const producto = await db.product.findUnique({
    where: { id: paramsId },
  });
  return Response.json(producto);
}
