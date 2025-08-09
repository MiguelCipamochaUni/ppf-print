import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import ProductoAdminItem from "./ProductoAdminItem";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export default async function AdminProductos() {
  /*
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });
  

  if (user.role !== "admin") redirect("/");
  */

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    await fetch(`/api/admin/productos/${id}/delete`, {
      method: "DELETE",
    });

    router.push("/admin/productos/eliminado");
  };

  const productosPrisma = await db.product.findMany();

  const productos = productosPrisma.map((p) => ({
    ...p,
    price: p.price.toNumber(), // convierte Decimal -> number
  }));

  return (
    <div>
      <h1>Gestión de productos</h1>
      <a href="/admin/productos/nuevo">Añadir producto</a>
      {productos.map((p) => (
        <ProductoAdminItem key={p.id} producto={p} />
      ))}
    </div>
  );
}
