import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Snackbar,
  TextField,
} from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";

const SignIn: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signin`;

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
          if (Array.isArray(data.message)) {
            setError(data.message[0]);
          } else {
            setError(data.message);
          }

          return;
        }
        localStorage.setItem("token", data.accessToken);
        router.push("/");
      });
  };

  return (
    <Box padding={5}>
      <h1 className={styles.title}>
        Welcome to <a href="./">SignIn!</a>
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
          SingIn!
        </Button>
      </Box>
      <Box textAlign="center" marginTop={8}>
        Do not have an account?
        <Link
          href="/signup"
          style={{
            color: "#0070f3",
            fontWeight: "bold",
          }}
        >
          SingUp
        </Link>
      </Box>
      {/* ??????????????? */}
      {error && (
        <>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={error !== ""}
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

export default SignIn;
