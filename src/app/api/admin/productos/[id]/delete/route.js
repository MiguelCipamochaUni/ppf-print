import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function DELETE(_, { params }) {
  const { id } = await params;

  const deleted = await db.product.delete({
    where: { id },
  });

  revalidatePath("/catalogo");
  revalidatePath(`/catalogo/${deleted.slug}`);
  return Response.json({ ok: true });
}
