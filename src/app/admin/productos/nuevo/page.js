"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NuevoProducto() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", price: "" });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = "";
    if (file) {
      // sube a Supabase
      const filePath = `productos/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from("productos")
        .upload(filePath, file);

      if (error) {
        console.error("Error subiendo la imagen:", error);
        alert("Error subiendo la imagen");
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("productos")
        .getPublicUrl(filePath);

      imageUrl = publicUrlData.publicUrl;
    }

    // guarda en tu backend
    await fetch("/api/admin/productos/new", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        mainImage: imageUrl,
      }),
    });

    router.push("/admin/productos");
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input name="title" placeholder="Título" onChange={handleChange} />
      <textarea
        name="description"
        placeholder="Descripción"
        onChange={handleChange}
      ></textarea>
      <input name="price" placeholder="Precio" onChange={handleChange} />
      <input type="file" name="image" onChange={handleFileChange} />
      <button type="submit">Guardar</button>
    </form>
  );
}
