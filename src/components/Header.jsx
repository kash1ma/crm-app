import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import logo from "../assets/logogo.png";
import debounce from "../../utility/debounce.js";
import { getClients } from "../../services/clientsService.js";

function Header() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
      console.log(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch clients");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSearch = debounce((event, value) => {
    setSearchTerm(value);
    //const fullName = client.name + " " + client.surname;
    if (value) {
      const filtered = clients.filter((client) => {
        const fullName = client.name + " " + client.surname;
        return fullName.toLowerCase().startsWith(value.toLowerCase());
      });
      setFilteredClients(filtered);
    } else {
      setFilteredClients([]);
    }
  }, 400)

  const handleClientSelect = (event, client) => {
    if (client && client.id) {
      console.log("Selected client ID:", client.id);
      navigate(`/clients/${client.id}`);
    }
  };

  return (
    <AppBar sx={{ bgcolor: "#282828" }}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", width: "50%" }}>
          <Box sx={{ mr: 5 }}>
            <img
              src={logo}
              alt="icon"
              style={{ height: "45px", width: "45px" }}
            />
          </Box>
          <Autocomplete
            freeSolo
            options={filteredClients}
            getOptionLabel={(option) =>
              option.name + " " + option.surname || ""
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Введите запрос"
                size="small"
                InputProps={{
                  ...params.InputProps,
                  sx: {
                    bgcolor: "#3a3a3a",
                    color: "#fff",
                    borderRadius: "4px",
                  },
                }}
              />
            )}
            onInputChange={handleSearch}
            onChange={handleClientSelect}
            fullWidth
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
