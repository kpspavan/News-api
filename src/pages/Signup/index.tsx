import { useState } from "react";
import {
  Container,
  Typography,
  styled,
  Box,
  Grid,
  Snackbar,
} from "@mui/material";
import TextInput from "../../component/Input/Input";
import Button from "../../component/Button/Button";
import { useRouter } from "next/router";
import Link from "next/link";

const StyledContainer = styled(Container)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const SignupPage = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSignup = async () => {
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    try {
      const response = await fetch("/api/signups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setSnackbarOpen(true);
        // Add a delay of 1500 milliseconds (1.5 seconds) before redirecting
        setTimeout(() => {
          router.push("/Login");
        }, 1500);
      } else {
        const data = await response.json();
        setError(data.error || "Unexpected error");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Unexpected error");
    }
  };

  return (
    <StyledContainer maxWidth="sm">
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
          Sign Up
        </Typography>
        <Box>
          <TextInput
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            style={{ backgroundColor: "blue" }}
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSignup}
          >
            {isSnackbarOpen ? "Redirecting to Login..." : "Sign Up"}
          </Button>
          {error && <Typography style={{ color: "red" }}>{error}</Typography>}
          <Grid container>
            <Grid item>
              <Link href="/Login">Already have an account? Sign In</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="User created successfully. Redirecting to Login..."
      />
    </StyledContainer>
  );
};

export default SignupPage;
