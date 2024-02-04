import React, { ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Typography,
  styled,
  Box,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextInput from "../../component/Input/Input";
import Button from "../../component/Button/Button";
import Link from "next/link";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn) {
      router.push("/Article");
    }
  }, [router]);

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        setError("Please enter both username and password");
        return;
      }

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        console.log("Login successful. isLoggedIn set in localStorage.");

        router.push("/Article");
      } else {
        const data = await response.json();
        console.error("Error during login. Server response:", data);
        setError(data.error || "Unexpected error");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Unexpected error");
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
      component="main"
      maxWidth="sm"
    >
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box>
          <TextInput
            label="Username"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
          <TextInput
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <Button
            style={{ backgroundColor: "blue" }}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/Signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
          {error && (
            <Typography variant="body2" style={{ color: "red" }}>
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
