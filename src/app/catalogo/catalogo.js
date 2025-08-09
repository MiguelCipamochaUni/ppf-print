import prisma from "../../lib/db";
import Link from "next/link";
import Image from "next/image";
import "./catalogo.css";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function Catalogo() {
  const productsPrisma = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  const products = productsPrisma.map((p) => ({
    ...p,
    price: p.price.toNumber(),
  }));

  return (
    <div className="catalogo-page">
      {/* HEADER: la imagen define la altura */}
      <header className="hero-header">
        <Image
          src="/assets/banner2.png"
          alt="PPF Print - Protege tu auto/moto"
          width={1589}
          height={516}
          priority
          sizes="100vw"
          className="hero-img"
        />
        <div className="hero-actions">
          <Link href="/carrito" className="hero-btn">
            Carrito
          </Link>
          <Link href="/perfil" className="hero-btn outline">
            Mi cuenta
          </Link>
        </div>
      </header>

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
      <Footer />
    </div>
  );
}
