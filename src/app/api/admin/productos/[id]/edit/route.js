import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function PUT(req, { params }) {
  const { title, description, price, mainImage } = await req.json();

  const slug = title.toLowerCase().replace(/\s+/g, "-");
  const paramsId = await params.id;

  const producto = await db.product.update({
    where: { id: paramsId },
    data: {
      title,
      description,
      price: parseFloat(price),
      slug,
      mainImage,
      images: [mainImage],
    },
  });

  revalidatePath("/catalogo");
  revalidatePath(`/catalogo/${producto.slug}`);

  return Response.json({ producto });
}
