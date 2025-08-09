import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  const { title, description, price, mainImage } = await req.json();

  const slug = title.toLowerCase().replace(/\s+/g, "-");

  const producto = await db.product.create({
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
