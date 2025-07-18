import prisma from "../../lib/db";
import Link from "next/link";

export default async function Catalogo() {
  const products = await prisma.product.findMany();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Catálogo</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12rem",
        }}
      >
        {products.map((p) => (
          <div key={p.id}>
            <img src={p.image} alt={p.title} width="200" />
            <h2>{p.title}</h2>
            <p>{p.price.toString()} COP</p>
            <p>{p.description.slice(0, 100)}...</p>
            <Link href={`/catalogo/${p.slug}`}>Ver más</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
