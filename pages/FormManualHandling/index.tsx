import {
  Button,
  Container,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react"; // use reference

export default function Form() {
  // uncontrolled component/input
  const InputNameref = useRef<HTMLInputElement>(null);
  const InputEmailref = useRef<HTMLInputElement>(null);

  const [nameErrorMessage, setnameErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  // controlled component/input
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // const nameFormValue = InputNameref.current?.value;
    // const emailFormValue = InputEmailref.current?.value;
    // alert("Form submitted " + nameFormValue + " " + emailFormValue);

    // validasi

    const nameValidation = name.length >= 3;
    const passwordValidation = password.length >= 6;

    if (!nameValidation) {
      setnameErrorMessage("Name must be at least 3 characters");
    }
    if (!passwordValidation) {
      setPasswordErrorMessage("Password must be at least 6 characters");
    }
  };

  return (
    <Container>
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          py: 4,
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />

        {nameErrorMessage && (
          <Typography color="red">{nameErrorMessage}</Typography>
        )}

        {/* 
        -event = kejadian yang sedang terjadi yaitu perubahannya
        -target = element mana yang sedang berubah
        -value = apapun yang sedang di ketik di input/form
        */}

        <TextField
          label="Password"
          variant="outlined"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          type="password"
        />

        {passwordErrorMessage && (
          <Typography color="red">{passwordErrorMessage}</Typography>
        )}

        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </FormControl>
    </Container>
  );
}
