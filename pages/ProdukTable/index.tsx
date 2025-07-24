import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  ButtonGroup,
} from "@mui/material";
import {
  createProduct,
  updateProduct,
} from "@/lib/ApiProducts";
import FormProduct from "@/components/FormProduct";
import Swal from "sweetalert2";
import TableProduct from "@/components/TableProduct";
import TableRowsIcon from "@mui/icons-material/TableRows";
import AppsIcon from "@mui/icons-material/Apps";
import CardProducts from "@/components/CardProduct";
import { SchemaFormCreateProduct } from "@/schemas/formProducts";
import { useProducts } from "@/hooks/useGetProducts";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import { useCategories } from "@/hooks/useCategories";
import { useQueryClient } from "@tanstack/react-query";

export default function Crud() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  const queryClient = useQueryClient();
  const deleteMutation = useDeleteProduct();

  const { data: productRes, isLoading } = useProducts(page, rowsPerPage, category);
  const { data: categoriesRes, isLoading: loadingCategories } = useCategories();

  const Allproducts = productRes?.data?.products || [];
  const totalProducts = productRes?.data?.total || 0;

  useEffect(() => {
    if (categoriesRes) {
      const cleanCategories = Array.isArray(categoriesRes)
        ? categoriesRes.map((item: any) =>
            typeof item === "string" ? item : item.name
          )
        : [];
      setCategories(cleanCategories);
    }
  }, [categoriesRes]);

  const handleCreateProduct = async (data: any) => {
    try {
      await createProduct(
        data.title,
        data.description,
        data.price,
        data.category,
        data.stock,
        data.image
      );
      Swal.fire("Success", "Product created!", "success");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (err) {
      console.error("Create error", err);
    }
  };

  const handleUpdateProduct = async (data: any) => {
    try {
      await updateProduct(
        data.id,
        data.title,
        data.description,
        data.price,
        data.category,
        data.stock
      );
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setSelectedProduct(null);
    } catch (err) {
      console.error("Update error", err);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    deleteMutation.mutate(id, {
      onSuccess: () => {
        Swal.fire("Deleted!", "Product has been deleted.", "success");
      },
      onError: () => {
        Swal.fire("Error", "Failed to delete product", "error");
      },
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleChangeCategory = (event: any) => {
    setCategory(event.target.value);
    setPage(0);
  };

  return (
    <Container sx={{ bgcolor: "#fff", py: 8 }}>
      <Typography
        variant="h4"
        sx={{ my: 4, textAlign: "center", color: "#013e87" }}
      >
        Manage Your Product
      </Typography>

      <FormProduct
        onSubmit={handleCreateProduct}
        schema={SchemaFormCreateProduct}
      />

      <Box sx={{ my: 8 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            my: 4,
            px: 4,
            justifyContent: "space-between",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">Sort by</Typography>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="select-category-label">Category</InputLabel>
              <Select
                labelId="select-category-label"
                id="select-category"
                value={category}
                onChange={handleChangeCategory}
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {String(cat)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <ButtonGroup variant="contained">
              <Button
                startIcon={<TableRowsIcon />}
                onClick={() => setViewMode("table")}
                color={viewMode === "table" ? "primary" : "inherit"}
              >
                Table
              </Button>
              <Button
                startIcon={<AppsIcon />}
                onClick={() => setViewMode("card")}
                color={viewMode === "card" ? "primary" : "inherit"}
              >
                Card
              </Button>
            </ButtonGroup>
          </Box>
        </Box>

        {viewMode === "table" ? (
          <TableProduct
            products={Allproducts}
            onUpdate={setSelectedProduct}
            onDelete={handleDeleteProduct}
            page={page}
            rowsPerPage={rowsPerPage}
            total={totalProducts}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        ) : (
          <CardProducts
            products={Allproducts}
            onUpdate={setSelectedProduct}
            onDelete={handleDeleteProduct}
            page={page}
            rowsPerPage={rowsPerPage}
            total={totalProducts}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      </Box>
    </Container>
  );
}
