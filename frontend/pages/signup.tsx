import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Snackbar,
  TextField,
} from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";

const SignUp: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`;

  const onSubmit = () => {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.message[0]);
          return;
        }
        router.push("/signin");
      });
  };

  return (
    <Box padding={5}>
      <h1 className={styles.title}>
        Welcome to <a href="./">SignUp!</a>
      </h1>
      <Box display="grid" gap={2} maxWidth="320px" marginTop={3} marginX="auto">
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="outlined-basic"
          label="Username"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
        <Button
          onClick={onSubmit}
          variant="contained"
          sx={{ width: "150px", margin: "auto" }}
        >
          SingUp!
        </Button>
      </Box>
      {/* エラー表示 */}
      {error && (
        <>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={error !== ""}
            autoHideDuration={6000}
            onClose={() => setError("")}
            sx={{ width: "50%" }}
          >
            <Alert
              onClose={() => setError("")}
              severity="error"
              sx={{ width: "100%" }}
            >
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          </Snackbar>
        </>
      )}
    </Box>
  );
};

export default SignUp;
