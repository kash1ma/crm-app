import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function Header() {
  return (
    <AppBar sx={{ bgcolor: "#282828" }}>
      <Toolbar>
        <Box sx={{ width: '50%' }}>
          <TextField
            variant="outlined"
            placeholder="Введите запрос"
            size="small"
            InputProps={{
              style: {
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