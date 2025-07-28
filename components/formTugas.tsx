"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Stack,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TugasCard from "@/components/cardTugas";

const schema = yup.object({
  nama: yup.string().required("Nama tugas wajib diisi"),
  deskripsi: yup.string().required("Deskripsi tugas wajib diisi"),
  prioritas: yup.boolean(),
  mulai: yup.date().required("Tanggal mulai wajib diisi"),
  deadline: yup
    .date()
    .required("Deadline wajib diisi")
    .min(yup.ref("mulai"), "Deadline tidak boleh sebelum tanggal mulai"),
});

type FormData = yup.InferType<typeof schema>;

export default function FormTugasSekolah() {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [tugasList, setTugasList] = useState<FormData[]>([]);

  const onSubmit = (data: FormData) => {
    setTugasList((prev) => [...prev, data]);
    alert(
      `✅ Tugas berhasil disimpan:\n\nNama: ${data.nama}\nDeskripsi: ${data.deskripsi}\nPrioritas: ${
        data.prioritas ? "Ya" : "Tidak"
      }\nMulai: ${data.mulai.toDateString()}\nDeadline: ${data.deadline.toDateString()}`
    );
    reset();
  };

  return (
    <Stack spacing={3} sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      <Typography variant="h5" fontWeight={700}>
        Form Tugas Sekolah 🎓
      </Typography>

      <TextField
        label="Nama Tugas"
        fullWidth
        {...register("nama")}
        error={!!errors.nama}
        helperText={errors.nama?.message}
      />

      <TextField
        label="Deskripsi Tugas"
        fullWidth
        multiline
        rows={3}
        {...register("deskripsi")}
        error={!!errors.deskripsi}
        helperText={errors.deskripsi?.message}
      />

      <FormControlLabel
        control={
          <Controller
            name="prioritas"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox {...field} checked={field.value} />
            )}
          />
        }
        label="Tandai sebagai tugas prioritas"
      />

      <Controller
        name="mulai"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <DatePicker
            {...field}
            label="Tanggal Mulai"
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!errors.mulai,
                helperText: errors.mulai?.message,
              },
            }}
          />
        )}
      />

      <Controller
        name="deadline"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <DatePicker
            {...field}
            label="Deadline Tugas"
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!errors.deadline,
                helperText: errors.deadline?.message,
              },
            }}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        onClick={handleSubmit(onSubmit)}
        sx={{ fontWeight: "bold" }}
      >
        Simpan Tugas 📥
      </Button>

      {tugasList.map((tugas, index) => (
        <TugasCard
          key={index}
          nama={tugas.nama}
          deskripsi={tugas.deskripsi}
          prioritas={tugas.prioritas}
          mulai={tugas.mulai}
          deadline={tugas.deadline}
        />
      ))}
    </Stack>
  );
}
