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
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByCategory,
  getCategories,
} from "@/lib/ApiProducts";
import FormProduct from "@/components/FormProduct";
import Swal from "sweetalert2";
import TableProduct from "@/components/TableProduct";
import TableRowsIcon from "@mui/icons-material/TableRows";
import AppsIcon from "@mui/icons-material/Apps";
import CardProducts from "@/components/CardProduct";
import { SchemaFormCreateProduct } from "@/schemas/formProducts";

export default function Crud() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  const fetchProducts = async () => {
    try {
      if (category && category !== "all") {
        const res = await getProductByCategory(category, page, rowsPerPage);
        const start = page * rowsPerPage;
        const end = start + rowsPerPage;

        setProducts(res.data.products);
        setTotal(res.data.total);
      } else {
        const res = await getProducts(page, rowsPerPage);
        setProducts(res.data.products);
        setTotal(res.data.total);
      }
    } catch (err) {
      console.error("Gagal fetch produk", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      const data = res.data;
      const cleanCategories = Array.isArray(data)
        ? data.map((item: any) => (typeof item === "string" ? item : item.name))
        : [];
      setCategories(cleanCategories);
    } catch (err) {
      console.error("Gagal fetch kategori", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, rowsPerPage, category]);

  useEffect(() => {
    fetchCategories();
  }, []);

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
      fetchProducts();
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
      fetchProducts();
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

    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);
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

      <FormProduct onSubmit={handleCreateProduct} schema={SchemaFormCreateProduct} />

      {/* <pre>{JSON.stringify(page, null, 2)}</pre> */}

      <Box sx={{ my: 8 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            my: 4,
            px: 4,
            justifyContent: "space-between",
            width: {
              xs: "100%",
              sm: "auto",
            },
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
            products={products}
            onUpdate={setSelectedProduct}
            onDelete={handleDeleteProduct}
            page={page}
            rowsPerPage={rowsPerPage}
            total={total}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        ) : (
          <CardProducts
            products={products}
            onUpdate={setSelectedProduct}
            onDelete={handleDeleteProduct}
            page={page}
            rowsPerPage={rowsPerPage}
            total={total}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      </Box>
    </Container>
  );
}
