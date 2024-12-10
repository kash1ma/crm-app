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
import CloseIcon from "@mui/icons-material/Close";

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

  const getPlaceholderText = (type) => {
    switch (type) {
      case "phone":
        return "Введите номер телефона";
      case "Email":
        return "Введите адрес электронной почты";
      case "Facebook":
        return "Введите ссылку на профиль";
      case "VK":
        return "Введите ссылку на профиль";
      case "Other":
        return "Введите контактную информацию";
      default:
        return "Введите контакт";
    }
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
          gap: 4,
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
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Введите фамилию"
          required
          fullWidth
        />

        <TextField
          sx={style}
          label="Отчество"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
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
                  "&:hover": {
                    background: "#C5C5C5", // Keep the background color the same on hover
                  },
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
                <MenuItem value="Other">Другое</MenuItem>
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
                    borderColor: "#434343", // Keep the border color the same on hover
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
              placeholder={getPlaceholderText(contact.type)}
              required
              fullWidth
            />
            <IconButton
              onClick={() => handleRemoveContact(index)}
              sx={{
                width: 50,
                height: 50,
                background: "#141414",
                marginLeft: 1,
                marginTop: 0.5,
                "&:hover": {
                  background: "#141414", // Keep the same background color on hover
                },
              }}
            >
              <CloseIcon
                sx={{
                  width: 1,
                  height: 1,
                  color: "white",
                }}
              />
            </IconButton>
          </Box>
        </Box>
      ))}
      {contacts.length < 10 && (
        <Box
          sx={{
            width: "100%",
            height: 50,
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
