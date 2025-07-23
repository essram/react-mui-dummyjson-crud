import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
  TablePagination,
  Paper,
  Avatar,
} from "@mui/material";
import { useRouter } from "next/router";

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

type UserListProps = {
  users: PropsUsers[];
  loading: boolean;
  page: number;
  rowsPerPage: number;
  total: number;
  onUpdate: (user: PropsUsers) => void;
  onDelete: (id: number) => void;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function UserList({
  users,
  loading,
  page,
  rowsPerPage,
  total,
  onUpdate,
  onDelete,
  onChangePage,
  onChangeRowsPerPage,
}: UserListProps) {

  const router = useRouter();

  return (
    <Box sx={{ px: 4, py: 6, bgcolor: "#f9fafc", minHeight: "100vh" }}>
  <Typography variant="h4" sx={{ mb: 6, textAlign: "center", fontWeight: 700 }}>
    User List
  </Typography>

  <Grid container spacing={3} justifyContent="center">
    {!loading && users.length > 0 ? (
      users.map((user) => (
        <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
          <Box
            component={Paper}
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 1,
              transition: "0.3s ease",
              textAlign: "center",
              ":hover": {
                transform: "scale(1.02)",
                boxShadow: 6,
              },
              bgcolor: "#fff",
            }}
          >
            
            <Avatar
              src={user.image}
              alt={user.username}
              sx={{
                width: 100,
                height: 100,
                mx: "auto",
                mb: 2,
                border: "3px solid #1976d2",
              }}
            />

            
            <Typography variant="h6" fontWeight={600} noWrap>
              @{user.username}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ wordBreak: "break-all", mb: 1 }}
            >
              {user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Name: {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gender: {user.gender}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Age: {user.age}
            </Typography>

           
            <Stack direction="row" spacing={1} justifyContent="center">
              <Button
                variant="outlined"
                size="small"
                onClick={() => onUpdate(user)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => onDelete(user.id)}
              >
                Delete
              </Button>
            </Stack>
            <Stack sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2
            }}>
              <Button variant="contained" onClick={() => router.push(`/userList/${user.id}`)}>More Detail</Button>
            </Stack>
          </Box>
        </Grid>
      ))
    ) : loading ? (
      <Typography>Loading...</Typography>
    ) : (
      <Typography>No users available.</Typography>
    )}
  </Grid>


  <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
    <TablePagination
      component="div"
      count={total}
      page={page}
      onPageChange={onChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onChangeRowsPerPage}
      rowsPerPageOptions={[3, 6, 12, 24, 48]}
      labelRowsPerPage="Cards per page:"
    />
  </Box>
</Box>

  );
}
