import db from "@/lib/db";

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

  return Response.json({ producto });
}
