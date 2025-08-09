import Image from "next/image";
import styles from "./page.module.css";
import Catalogo from "./catalogo/catalogo";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export default function Home() {
  return <Catalogo />;
}
