import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import db from "@/lib/db";

export default async function AdminProductos() {
  /*
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });
  

  if (user.role !== "admin") redirect("/");
  */

  const productos = await db.product.findMany();

  return (
    <div>
      <h1>Gestión de productos</h1>
      <a href="/admin/productos/nuevo">Añadir producto</a>
      {productos.map((p) => (
        <div key={p.id}>
          <h2>{p.title}</h2>
          <p>{p.price.toString()} COP</p>
          <a href={`/admin/productos/${p.id}/editar`}>Editar</a>
          <form method="POST" action={`/api/admin/productos/${p.id}/delete`}>
            <button type="submit">Eliminar</button>
          </form>
        </div>
      ))}
    </div>
  );
}
