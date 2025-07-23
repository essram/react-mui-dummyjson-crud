import {
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

// type FormRegisterSchema = {
//   name: string;
//   password: string;
// };

const formRegisterSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(13, "Name must be at most 10 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(16, "Password must be at most 16 characters"),
  repeatPassword: z.string(),  
  age: z.coerce.number().min(18, "Age must be at least 18").max(100),
}).superRefine(({ password, repeatPassword }, ctx) => {
  if (password !== repeatPassword) {
    ctx.addIssue({ path: ["repeatPassword"], message: "Passwords do not match" });
  }
})

type FormRegisterSchema = z.infer<typeof formRegisterSchema>;

export default function RHFPage() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormRegisterSchema>({
    resolver: zodResolver(formRegisterSchema),
  });

  const handleRegisterUser = (values: FormRegisterSchema) => {
    alert("Form submitted");
  };

  return (
    <Container>
      <Typography>Form</Typography>

      <FormControl
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
        onSubmit={form.handleSubmit(handleRegisterUser)}
      >
        <Controller
          name="name"
          control={form.control}
          render={({ field }) => (
            <Container
              component={"div"}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <TextField label="Name" type="text" {...form.register("name")} />
              <span style={{ color: "red" }}>
                {form.formState.errors.name?.message}
              </span>
            </Container>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field }) => (
            <Container
              component={"div"}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <TextField
                label="Password"
                type="password"
                {...form.register("password")}
                InputProps={{
                  type: showPassword ? "text" : "password",
                }}
              />
              <span style={{ color: "red" }}>
                {form.formState.errors.password?.message}
              </span>
            </Container>
          )}
        />
        <Controller
          name="repeatPassword"
          control={form.control}
          render={({ field }) => (
            <Container
              component={"div"}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <TextField
                label="Repeat Password"
                type="password"
                {...form.register("repeatPassword")}
                InputProps={{
                  type: showPassword ? "text" : "password",
                }}
              />
              <span style={{ color: "red" }}>
                {form.formState.errors.repeatPassword?.message}
              </span>
            </Container>
          )}
        />

        <Container>
          <label htmlFor="showPassword">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            Show Password
          </label>
        </Container>

        <Controller
          name="age"
          control={form.control}
          render={({ field }) => (
            <Container
              component={"div"}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <TextField label="Age" type="text" {...form.register("age")} />
              <span style={{ color: "red" }}>
                {form.formState.errors.age?.message}
              </span>
            </Container>
          )}
        />

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </FormControl>

         <pre>{JSON.stringify(form.getValues(), null, 2)}</pre>

    </Container>
  );
}
