import Link from "next/link";

export default function Admin() {
  return (
    <div>
      <h1>Panel de administrador</h1>
      <Link href="/admin/productos">Gestionar productos</Link>
    </div>
  );
}
