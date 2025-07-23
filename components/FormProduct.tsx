// src/components/FormProduct.tsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  SchemaFormCreateProduct,
  SchemaFormCreateProductType,
  SchemaFormEditProduct,
  SchemaFormEditProductType,
} from "@/schemas/formProducts";
import { Button, Stack, styled, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function FormProduct({ onSubmit, selectedProduct }: any) {
  const isEdit = !!selectedProduct;

  const form = useForm<SchemaFormCreateProductType | SchemaFormEditProductType>({
    resolver: yupResolver(isEdit ? SchemaFormEditProduct : SchemaFormCreateProduct),
    defaultValues: {
      title: selectedProduct?.title || "",
      description: selectedProduct?.description || "",
      price: selectedProduct?.price || "",
      image: "",
      category: selectedProduct?.category || "",
      stock: selectedProduct?.stock || "",
    },
  });

  const uploadedImage = form.watch("image");

  const handleSubmit = (data: any) => {
    const payload = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
      image: data.image?.[0] || selectedProduct?.thumbnail || "",
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Stack spacing={2}>
        <TextField
          label="Product Name"
          {...form.register("title")}
          error={!!form.formState.errors.title}
          helperText={form.formState.errors.title?.message}
        />
        <TextField
          label="Description"
          {...form.register("description")}
          multiline
          rows={4}
          error={!!form.formState.errors.description}
          helperText={form.formState.errors.description?.message}
        />

        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput
            type="file"
            {...form.register("image")}
            accept="image/png, image/jpeg"
          />
        </Button>

        {form.formState.errors.image && (
          <span style={{ color: "red" }}>
            {form.formState.errors.image.message}
          </span>
        )}

        {uploadedImage && uploadedImage.length > 0 && (
          <span style={{ fontSize: "14px", color: "green" }}>
            File terpilih: {uploadedImage[0].name}
          </span>
        )}

        <TextField
          label="Price"
          {...form.register("price")}
          error={!!form.formState.errors.price}
          helperText={form.formState.errors.price?.message}
        />
        <TextField
          label="Category"
          {...form.register("category")}
          error={!!form.formState.errors.category}
          helperText={form.formState.errors.category?.message}
        />
        <TextField
          label="Stock"
          {...form.register("stock")}
          error={!!form.formState.errors.stock}
          helperText={form.formState.errors.stock?.message}
        />
        <Button type="submit" variant="contained">
          {isEdit ? "Update Product" : "Add Product"}
        </Button>
      </Stack>
    </form>
  );
}
