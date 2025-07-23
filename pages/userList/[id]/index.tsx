import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserDetail } from "@/lib/ApiUser";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
export default function userDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getUserDetail(Number(id))
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h4">Product not found</Typography>
      </Container>
    );
  }
  return (
    <Container>
      <Container
        sx={{
          bgcolor: "#fff",
          m: 4,
          borderRadius: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={() => router.back()}
          startIcon={<ArrowBackIosNewIcon />}
          sx={{ my: 4 }}
        >
          Back
        </Button>

        <Box sx={{ display: "flex", mt: 4 }}>
          <Box
            sx={{
              flex: 1,
              bgcolor: "#f5f5f5",
              borderRadius: 2,
              p: 4,
              mr: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={user.thumbnail} alt={user.title} />
          </Box>
          <Box sx={{ flex: 1, ml: 4, mt: 3 }}>
            <Typography variant="body1" sx={{ textAlign: "justify", textTransform: "capitalize" }}>
            <span style={{ fontWeight: "bold" }}>Username</span> :{" "}
              {user.username}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "justify" }}>
              <span style={{ fontWeight: "bold" }}>First Name</span> :{" "}
              {user.description}
            </Typography>
            <Typography variant="body1">
              <span style={{ fontWeight: "bold" }}>last Name</span> : $
              {user.price}
            </Typography>
            <Typography variant="body1">
              <span style={{ fontWeight: "bold" }}>maidenName</span> :{" "}
              {user.stock}
            </Typography>
            <Typography variant="body1">
              <span style={{ fontWeight: "bold" }}>Age</span> :{" "}
              {user.rating}
            </Typography>
            <Typography variant="body1">
              <span style={{ fontWeight: "bold" }}>University</span> :{" "}
              {user.rating}
            </Typography>
            <Typography variant="body1">
              <span style={{ fontWeight: "bold" }}>Country</span> :{" "}
              {user.rating}
            </Typography>
            <Typography variant="body1">
              <span style={{ fontWeight: "bold" , textTransform: "capitalize"}}>Gender</span> :{" "}
              {user.category}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 4, py: 4 }}>
          <Typography variant="h6">
            Reviews ({user.reviews?.length})
          </Typography>
          {user.reviews?.map((review: any, index: number) => (
            <Box
              key={index}
              sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}
            >
              <Typography variant="body1">
                {review.rating} - {review.comment}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                by {review.reviewerName} ({review.reviewerEmail})
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(review.date).toLocaleDateString()}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Container>
  );
}
