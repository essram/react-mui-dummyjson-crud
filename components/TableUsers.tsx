import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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

type TableUserProps = {
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

export default function TableUser({
  users,
  loading,
  page,
  rowsPerPage,
  total,
  onUpdate,
  onDelete,
  onChangePage,
  onChangeRowsPerPage,
}: TableUserProps) {
  const router = useRouter();

  return (
    <Box sx={{ px: 4 }}>
      <Typography
        variant="h4"
        sx={{ my: 4, textAlign: "center", fontWeight: 600 }}
      >
        List of Users
      </Typography>
      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 1 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Age</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && users.length > 0 ? (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{
                    transition: "0.3s",
                    "&:hover": { backgroundColor: "#f0f8ff" },
                  }}
                >
                  <TableCell>
                    <Avatar alt={user.username} src={user.image} />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1}>
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
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => router.push(`/users/${user.id}`)}
                      >
                        Details
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : loading ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <Typography align="center" py={2}>
                    Loading...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell colSpan={8}>
                  <Typography align="center" py={2}>
                    No users available.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={onChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onChangeRowsPerPage}
          rowsPerPageOptions={[3, 6, 12, 24, 48]}
          labelRowsPerPage="Rows per page:"
        />
      </Box>
    </Box>
  );
}
