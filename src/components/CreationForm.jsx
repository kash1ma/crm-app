import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  IconButton,
} from "@mui/material";
import { createClient } from "../../services/clientsService";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export default function ClientForm({ onClose }) {
  const [contacts, setContacts] = useState([{ type: "phone", value: "" }]);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [surname, setSurname] = useState("");

  const style = {
    background: "#292929",
    borderRadius: 4,
    "& .MuiInputBase-input": {
      color: "#CBCBCB",
    },
    "& .MuiInputLabel-root": {
      color: "#CBCBCB",
    },
  };

  const handleAddContact = () => {
    if (contacts.length < 10) {
      setContacts([...contacts, { type: "phone", value: "" }]);
    }
  };

  const handleContactChange = (index, field, value) => {
    const updatedContacts = [...contacts];
    updatedContacts[index][field] = value;
    setContacts(updatedContacts);
  };

  const handleRemoveContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clientData = {
      name,
      lastName,
      surname,
      contacts,
    };
    console.log(clientData);

    try {
      await createClient(clientData);
      console.log("Client created successfully", clientData);
      onClose();
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        padding: "0 0 2.5rem 0",
      }}
    >
      <Box
        sx={{
          p: "0 2rem 2rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          marginTop: 3,
          margin: "0 auto",
        }}
      >
        <TextField
          sx={style}
          label="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
          required
          fullWidth
        />

        <TextField
          sx={style}
          label="Фамилия"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Введите фамилию"
          required
          fullWidth
        />

        <TextField
          sx={style}
          label="Отчество"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Введите Отчество"
          fullWidth
        />
      </Box>

      {contacts.map((contact, index) => (
        <Box
          key={index}
          sx={{
            width: "100%", // Set the width to 100% to stretch across the modal
            backgroundColor: "#292929",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: "1rem",
            }}
          >
            <FormControl fullWidth>
              <Select
                sx={{
                  background: "#C5C5C5",
                  fontWeight: 10,
                  borderRadius: "0.3rem 0 0 0.3rem",
                }}
                value={contact.type}
                onChange={(e) =>
                  handleContactChange(index, "type", e.target.value)
                }
              >
                <MenuItem value="phone">Телефон</MenuItem>
                <MenuItem value="Email">Емейл</MenuItem>
                <MenuItem value="Facebook">Фейсбук</MenuItem>
                <MenuItem value="VK">ВК</MenuItem>
                <MenuItem value="Другое">Другое</MenuItem>
              </Select>
            </FormControl>

            <TextField
              sx={{
                width: 1000,
                background: "#292929",

                "& .MuiInputBase-input": {
                  color: "#CBCBCB",
                },
                "& .MuiInputLabel-root": {
                  color: "#CBCBCB",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#434343",
                  },
                  "&:hover fieldset": {
                    borderColor: "#CBCBCB",
                    borderLeft: "none",
                    borderLeft: "none",
                    borderRadius: "0px",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#CBCBCB",
                    borderLeft: "none",
                    borderRadius: "0px",
                  },
                },
              }}
              value={contact.value}
              onChange={(e) =>
                handleContactChange(index, "value", e.target.value)
              }
              placeholder="Введите контакт"
              required
              fullWidth
            />
          </Box>
        </Box>
      ))}
      {contacts.length < 10 && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#292929",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleAddContact}
            sx={{
              border: "none",
              color: "white",
              paddingBottom: "1rem",
            }}
          >
            <AddCircleOutlineOutlinedIcon
              sx={{ color: "aqua", marginBottom: 0.2, marginRight: 0.5 }}
            ></AddCircleOutlineOutlinedIcon>{" "}
            Добавить контакт
          </Button>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button
          variant="contained"
          type="submit"
          sx={{
            margin: "0 auto",
            padding: 2,
            marginTop: 3,
            width: 200,
            borderRadius: 5,
            background: "#555555",
            fontWeight: 300,
          }}
        >
          Сохранить
        </Button>
      </Box>
    </Box>
  );
}