"use client";
import { useCategories } from "@/hooks/useCategories";
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
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { useUpdateProduct } from "@/hooks/useUpdateproduct";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useEffect, useState } from "react";

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

interface FormProductProps {
  selectedProduct?: any;
  onSuccess?: () => void;
}

export default function FormProduct({
  onSubmit: onSuccess,
  selectedProduct,
}: any) {
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const isEdit = !!selectedProduct;

  const form = useForm<SchemaFormCreateProductType | SchemaFormEditProductType>(
    {
      resolver: yupResolver(
        isEdit ? SchemaFormEditProduct : SchemaFormCreateProduct
      ),
      defaultValues: {
        title: selectedProduct?.title || "",
        description: selectedProduct?.description || "",
        price: selectedProduct?.price || "",
        image: "",
        category: selectedProduct?.category || "",
        stock: selectedProduct?.stock || "",
      },
    }
  );

  const { data: categoriesRes, isLoading: loadingCategories } = useCategories();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (categoriesRes) {
      const clean = Array.isArray(categoriesRes)
        ? categoriesRes.map((item: any) =>
            typeof item === "string" ? item : item.name
          )
        : [];
      setCategories(clean);
    }
  }, [categoriesRes]);

  const router = useRouter();

  const uploadedImage = form.watch("image");

  const handleSubmit = (data: any) => {
    const uploadedImage = form.watch("image") as FileList | undefined;

    const payload = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
      image: data.image?.[0] || selectedProduct?.thumbnail || "",
    };

    // onSuccess(payload);

    if (isEdit) {
      updateMutation.mutate(
        {
          id: selectedProduct.id,
          title: payload.title,
          description: payload.description,
          price: payload.price,
          category: payload.category,
          stock: payload.stock,
        },
        {
          onSuccess: () => {
            Swal.fire({
              title: "Product updated!",
              icon: "success",
              draggable: true,
            });
            router.push("/ProdukTable");
            onSuccess?.();
          },

          onError: () => {
            alert("Failed to update product");
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          Swal.fire("Success", "Product created!", "success");
          // alert("Product created");
          form.reset();
          onSuccess?.();
        },

        onError: () => {
          alert("Failed to create product");
        },
      });
    }
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

        {uploadedImage?.length && (
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
        <FormControl fullWidth error={!!form.formState.errors.category}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            {...form.register("category")}
            defaultValue=""
          >
            {categories.map((cat: any) => (
              <MenuItem key={cat} value={cat}>
                {String(cat)}
              </MenuItem>
            ))}
          </Select>
          {form.formState.errors.category && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {form.formState.errors.category.message}
            </span>
          )}
        </FormControl>

        <TextField
          label="Stock"
          {...form.register("stock")}
          error={!!form.formState.errors.stock}
          helperText={form.formState.errors.stock?.message}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={createMutation.isLoading || updateMutation.isLoading}
        >
          {isEdit
            ? updateMutation.isLoading
              ? "Updating..."
              : "Update Product"
            : createMutation.isLoading
              ? "Adding..."
              : "Add Product"}
        </Button>
      </Stack>
    </form>
  );
}
