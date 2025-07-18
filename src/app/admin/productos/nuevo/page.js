"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("image", file);

    await fetch("/api/admin/productos", {
      method: "POST",
      body: data,
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
