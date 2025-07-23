import prisma from "../../../lib/db";
import Link from "next/link";
import "./producto.css";

export default async function Producto({ params }) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({ where: { slug } });

  const images =
    product.images?.length > 0 ? product.images : [product.mainImage];

  return (
    <div className="product-page">
      <div className="breadcrumb">
        <Link href="/">← Volver al catálogo</Link>
      </div>

      <div className="product-container">
        <div className="product-gallery">
          <div className="product-main-image">
            <img src={product.mainImage} alt={product.title} />
          </div>

          {images.length > 1 && (
            <div className="product-thumbnails">
              {images.map((img, index) => (
                <img key={index} src={img} alt={`Thumbnail ${index}`} />
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p className="product-price">
            {Number(product.price).toLocaleString("es-CO")} COP
          </p>
          <button className="add-to-cart">Añadir al carrito</button>
        </div>
      </div>
    </div>
  );
}
