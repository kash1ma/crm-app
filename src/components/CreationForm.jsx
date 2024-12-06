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
import { Delete } from "@mui/icons-material";

export default function ClientForm({ onClose }) {
  const [contacts, setContacts] = useState([{ type: "phone", value: "" }]);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [surname, setSurname] = useState("");

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
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6">Клиентская форма</Typography>

      <TextField
        label="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Введите имя"
        required
        fullWidth
      />

      <TextField
        label="Фамилия"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Введите фамилию"
        required
        fullWidth
      />

      <TextField
        label="Отчество"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        placeholder="Введите отчество"
        fullWidth
      />

      <Typography>Контакты</Typography>
      {contacts.map((contact, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Тип контакта</InputLabel>
            <Select
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
            value={contact.value}
            onChange={(e) =>
              handleContactChange(index, "value", e.target.value)
            }
            placeholder="Введите контакт"
            required
            fullWidth
          />

          <IconButton
            color="error"
            onClick={() => handleRemoveContact(index)}
            size="large"
          >
            <Delete />
          </IconButton>
        </Box>
      ))}

      {contacts.length < 10 && (
        <Button variant="outlined" onClick={handleAddContact}>
          Добавить контакт
        </Button>
      )}

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
        <Button variant="contained" color="primary" type="submit">
          Сохранить
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Отмена
        </Button>
      </Box>
    </Box>
  );
}
