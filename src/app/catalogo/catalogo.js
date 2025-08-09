import prisma from "../../lib/db";
import Link from "next/link";
import "./catalogo.css";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function Catalogo() {
  const productsPrisma = await prisma.product.findMany();
  const products = productsPrisma.map((p) => ({
    ...p,
    price: p.price.toNumber(), // convierte Decimal -> number
  }));

  return (
    <div className="catalogo-container">
      <h1>Catálogo</h1>
      <div className="catalogo-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.mainImage} alt={p.title} className="product-image" />
            <div className="product-info">
              <h2>{p.title}</h2>
              <p>{p.description.slice(0, 100)}...</p>
              <div className="price-badge">
                ${p.price.toLocaleString("es-CO")}
              </div>
              <Link href={`/catalogo/${p.slug}`} className="product-link">
                Ver más
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
