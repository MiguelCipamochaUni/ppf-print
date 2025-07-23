"use client";

import { useRouter } from "next/navigation";

export default function ProductoAdminItem({ producto }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    await fetch(`/api/admin/productos/${producto.id}/delete`, {
      method: "DELETE",
    });

    router.push("/admin/productos/eliminado?ok=1");
  };

  return (
    <div>
      <h2>{producto.title}</h2>
      <p>{producto.price.toLocaleString("es-CO")} COP</p>
      <a href={`/admin/productos/${producto.id}/editar`}>Editar</a>
      <button
        onClick={handleDelete}
        style={{ color: "red", cursor: "pointer" }}
      >
        Eliminar
      </button>
    </div>
  );
}
