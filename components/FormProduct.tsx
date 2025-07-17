import { Box, Button, TextField, Stack, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function FormProduct({ onSubmit, selectedProduct }: any) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedProduct) {
      setForm({
        title: selectedProduct.title || "",
        description: selectedProduct.description || "",
        price: String(selectedProduct.price || ""),
        image: selectedProduct.thumbnail || "",
        category: selectedProduct.category || "",
        stock: String(selectedProduct.stock || ""),
      });
    }
  }, [selectedProduct]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (["price", "stock"].includes(name) && !/^\d*$/.test(value)) return;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    const { title, description, price, category, stock } = form;

    if (!title || !description || !price || !category || !stock) {
      setError("Semua field harus diisi kecuali gambar (jika update)");
      return;
    }

    setError(null);

    const payload = selectedProduct
      ? {
          id: selectedProduct.id,
          title: form.title,
          description: form.description,
          price: Number(form.price),
          category: form.category,
          stock: Number(form.stock),
          image: form.image,
        }
      : {
          title: form.title,
          description: form.description,
          price: Number(form.price),
          category: form.category,
          stock: Number(form.stock),
          image: form.image,
        };

       

    onSubmit(payload);

    setForm({
      title: "",
      description: "",
      price: "",
      image: "",
      category: "",
      stock: "",
    });
  };

  return (
    <Stack spacing={2}>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Product Name"
        name="title"
        value={form.title}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
      />
      {!selectedProduct && (
        <TextField
          label="Image URL"
          name="image"
          value={form.image}
          onChange={handleChange}
          fullWidth
        />
      )}
      <TextField
        label="Price"
        name="price"
        value={form.price}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Stock"
        name="stock"
        value={form.stock}
        onChange={handleChange}
        fullWidth
      />
      <Button variant="contained" onClick={handleSubmit}>
        {selectedProduct ? "Update Product" : "Add Product"}
      </Button>
    </Stack>
  );
}
