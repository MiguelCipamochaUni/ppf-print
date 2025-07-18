import db from "@/lib/db";

export async function POST(req) {
  const { title, description, price } = await req.json();

  const slug = title.toLowerCase().replace(/\s+/g, "-");

  const producto = await db.product.update({
    data: {
      title,
      description,
      price: parseFloat(price),
      slug,
      mainImage: "/assets/default.png", // cambiar cuando implementes subida de imágenes
      images: [],
    },
  });

  return Response.json({ producto });
}
