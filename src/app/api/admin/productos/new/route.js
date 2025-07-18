import db from "@/lib/db";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  console.log("aqui");
  const form = formidable({
    multiples: false,
    uploadDir: "./public/assets/productos",
    keepExtensions: true,
  });

  const data = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
  console.log(data);

  const { title, description, price } = data.fields;
  const file = data.files.image;

  const slug = title.toLowerCase().replace(/\s+/g, "-");

  // Construye la ruta relativa para guardar en DB
  const mainImage = `/assets/productos/${path.basename(file.filepath)}`;

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

  return Response.json({ producto });
}
