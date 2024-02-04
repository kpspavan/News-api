import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

const Navbar = ({ handleSignout }: any) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <>
          <Button component="a" color="inherit" variant="outlined">
            <Typography variant="h6" color="inherit">
              Logo
            </Typography>
          </Button>
        </>

        <div style={{ marginLeft: "auto" }}>
          

          <>
            <Button color="inherit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="24"
                height="24"
                className="mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
              <Typography
                onClick={handleSignout}
                variant="body1"
                color="inherit"
              >
                Sign out
              </Typography>
            </Button>
          </>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
