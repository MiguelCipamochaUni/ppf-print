"use client";

import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

export default function ProductoEliminado({ searchParams }) {
  const router = useRouter();

  if (searchParams.ok !== "1") {
    redirect("/admin/productos");
  }

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1 style={{ color: "green", fontSize: "2rem" }}>
        ✅ ¡Producto eliminado satisfactoriamente!
      </h1>
      <p>El producto ha sido eliminado de la base de datos.</p>
      <button
        onClick={() => router.push("/admin/productos")}
        style={{
          marginTop: "2rem",
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Volver al listado
      </button>
    </div>
  );
}
