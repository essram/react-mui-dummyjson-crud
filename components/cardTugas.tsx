import { Card, CardContent, Typography } from "@mui/material";
import { format } from "date-fns";

interface TugasCardProps {
  nama: string;
  deskripsi: string;
  priority: boolean;
  mulai: Date | null;
  deadline: Date | null;
}

export default function TugasCard({
  nama,
  deskripsi,
  priority: prioritas,
  mulai,
  deadline,
}: TugasCardProps) {
  return (
    <Card sx={{ bgcolor: prioritas ? "#ffe0e0" : "#f5f5f5" }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700}>
          {nama}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {deskripsi}
        </Typography>
        <Typography variant="body2">
          Mulai: {mulai ? format(new Date(mulai), "dd MMM yyyy") : "-"}
        </Typography>
        <Typography variant="body2">
          Deadline: {deadline ? format(new Date(deadline), "dd MMM yyyy") : "-"}
        </Typography>
        {prioritas && (
          <Typography variant="caption" color="error">
            Tugas Prioritas
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
