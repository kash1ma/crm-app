import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import logo from '../assets/logo.webp'

function Header() {
  return (
    <AppBar sx={{ bgcolor: "#282828" }}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", width: "50%" }}>
          <Box sx={{ mr: 5 }}>
            <img 
              src={logo}
              alt="icon" 
              style={{ height: "40px", width: "40px" }} 
            />
          </Box>
          <TextField
            variant="outlined"
            placeholder="Введите запрос"
            size="small"
            InputProps={{
              sx: {
                bgcolor: "#3a3a3a",
                color: "#fff",
                borderRadius: "4px",
              },
            }}
            fullWidth
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
