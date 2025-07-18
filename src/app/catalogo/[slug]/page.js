import prisma from "../../../lib/db";

export default async function Producto({ params }) {
  const { slug } = params;

  const product = await prisma.product.findUnique({ where: { slug } });
  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} width="400" />
      <p>{product.description}</p>
      <p>Precio: {product.price.toString()} COP</p>
      <button>Añadir al carrito</button>
    </div>
  );
}
