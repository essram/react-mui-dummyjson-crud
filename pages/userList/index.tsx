import { useEffect, useState } from "react";
import CardUser from "@/components/CardUser";
import { getUsers, getUserByGender, getGenderOptions } from "@/lib/ApiUser";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import TableRowsIcon from "@mui/icons-material/TableRows";
import AppsIcon from "@mui/icons-material/Apps";
import TableUsers from "@/components/TableUsers";

type PropsUsers = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  username: string;
  image: string;
};

export default function UserPage() {
  const [users, setUsers] = useState<PropsUsers[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [total, setTotal] = useState(0);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

 
  const [gender, setGender] = useState<string>("");

  // Untuk list gender option
  const [genderOptions, setGenderOptions] = useState<string[]>([]);

  useEffect(() => {
    fetchUsers(page, rowsPerPage, gender);
  }, [page, rowsPerPage, gender]);

  const fetchUsers = async (
    page: number,
    limit: number,
    gender: string = ""
  ) => {
    setLoading(true);
    try {
      let res;
      if (gender) {
        res = await getUserByGender(gender, page, limit);
        setUsers(res.data.users);
        setTotal(res.data.total ?? res.data.users.length);
      } else {
        res = await getUsers(page, limit);
        setUsers(res.data.users);
        setTotal(res.data.total ?? res.data.users.length);
      }
    } catch (error) {
      alert("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  // Ambil gender options hanya sekali saat mounting
  useEffect(() => {
    const fetchGenderOpts = async () => {
      try {
        const opts = await getGenderOptions();
        setGenderOptions(opts as string[]);
      } catch (err) {
        console.error("Gagal fetch gender options", err);
      }
    };
    fetchGenderOpts();
  }, []);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeGender = (event: any) => {
    setGender(event.target.value);
    setPage(0);
  };

  const handleUpdateUser = (user: PropsUsers) => {
    alert(`Edit user: ${user.username}`);
  };

  const handleDeleteUser = (id: number) => {
    alert(`Delete user id: ${id}`);
  };

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: "#f5f7fa",
        borderRadius: 3,
        boxShadow: 1,
        mb: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          gap: 2,
        }}
      >
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="select-gender-label">Filter by Gender</InputLabel>
          <Select
            labelId="select-gender-label"
            id="select-gender"
            value={gender}
            label="Filter by Gender"
            onChange={handleChangeGender}
            sx={{ borderRadius: 2, bgcolor: "#fff" }}
          >
            <MenuItem value="">All</MenuItem>
            {genderOptions.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <ButtonGroup
          variant="outlined"
          sx={{
            bgcolor: "#fff",
            borderRadius: 2,
            "& button": {
              textTransform: "none",
              fontWeight: 500,
            },
          }}
        >
          <Button
            startIcon={<TableRowsIcon />}
            onClick={() => setViewMode("table")}
            color={viewMode === "table" ? "primary" : "inherit"}
            sx={{
              bgcolor: viewMode === "table" ? "#e3f2fd" : "inherit",
            }}
          >
            Table View
          </Button>
          <Button
            startIcon={<AppsIcon />}
            onClick={() => setViewMode("card")}
            color={viewMode === "card" ? "primary" : "inherit"}
            sx={{
              bgcolor: viewMode === "card" ? "#e3f2fd" : "inherit",
            }}
          >
            Card View
          </Button>
        </ButtonGroup>
      </Box>

      {viewMode === "table" ? (
        <TableUsers
          users={users}
          loading={loading}
          page={page}
          rowsPerPage={rowsPerPage}
          total={total}
          onUpdate={handleUpdateUser}
          onDelete={handleDeleteUser}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      ) : (
        <CardUser
          users={users}
          loading={loading}
          page={page}
          rowsPerPage={rowsPerPage}
          total={total}
          onUpdate={handleUpdateUser}
          onDelete={handleDeleteUser}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Box>
  );
}
