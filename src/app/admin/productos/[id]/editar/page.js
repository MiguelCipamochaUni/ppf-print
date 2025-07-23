"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditarProducto() {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    mainImage: "",
  });
  const [file, setFile] = useState(null);

  // obtener datos actuales
  useEffect(() => {
    const fetchProducto = async () => {
      const res = await fetch(`/api/admin/productos/${params.id}`);
      const data = await res.json();
      setForm({
        title: data.title,
        description: data.description,
        price: data.price,
        mainImage: data.mainImage,
      });
      setLoading(false);
    };
    fetchProducto();
  }, [params.id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = form.mainImage;

    if (file) {
      // sube nueva imagen a Supabase
      const filePath = `productos/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from("productos")
        .upload(filePath, file);

      if (error) {
        alert("Error subiendo la imagen");
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("productos")
        .getPublicUrl(filePath);
      imageUrl = publicUrlData.publicUrl;
    }

    await fetch(`/api/admin/productos/${params.id}/edit`, {
      method: "PUT",
      body: JSON.stringify({
        ...form,
        mainImage: imageUrl,
      }),
    });

    router.push("/admin/productos");
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        name="title"
        placeholder="Título"
        value={form.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
      ></textarea>
      <input
        name="price"
        placeholder="Precio"
        value={form.price}
        onChange={handleChange}
      />
      <p>Imagen actual:</p>
      <img src={form.mainImage} alt="actual" width="200" />
      <input type="file" name="image" onChange={handleFileChange} />
      <button type="submit">Guardar cambios</button>
    </form>
  );
}
