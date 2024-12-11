import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getClientById,
  updateClient,
  deleteClient,
} from "../services/clientsService";
import {
  Button,
  TextField,
  Box,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  RadioGroup,
  IconButton,
  FormControlLabel,
  Radio,
  Grid2,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import BackIcon from "./assets/icons/Back.svg";
import validator from "validator";

export default function UserProfile() {
  const { id } = useParams();
  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getClientById(id);
        setClient(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);

  if (!client) {
    return <div>Loading...</div>;
  }

  console.log(client);

  function handleDelete(id) {
    deleteClient(id)
      .then(() => {
        setClients((prevClients) =>
          prevClients.filter((client) => client.id !== id)
        );
        console.log("Client successfully deleted");
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to delete client");
      });
    fetchClients();
    console.log("Client successfully deleted");
  }
  const handleInputChange = (field, value) => {
    setClient((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await updateClient(id, client);
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

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

  const getPlaceholderText = (type) => {
    switch (type) {
      case "phone":
        return "Введите номер телефона";
      case "email":
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

  return (
    <Container sx={{ mt: 6, color: "#fff" }} maxWidth="lg">
      <Button sx={{ position: "relative", color: "white" }}>
        <FirstPageIcon></FirstPageIcon>
      </Button>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
        {`${client.name} ${client.surname} `} ID{id}
      </Typography>

      <Grid2 container spacing={4}>
        <Grid2 item xs={12} md={6}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            User Info
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Фамилия"
              value={client.lastName || ""}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              sx={{ background: "#292929", borderRadius: 1 }}
            />
            <TextField
              label="Имя"
              value={client.firstName || ""}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              sx={{ background: "#292929", borderRadius: 1 }}
            />
            <TextField
              label="Отчество"
              value={client.middleName || ""}
              onChange={(e) => handleInputChange("middleName", e.target.value)}
              sx={{ background: "#292929", borderRadius: 1 }}
            />
            <TextField
              label="Date of Birth"
              value={client.dateOfBirth || ""}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              placeholder="MM/DD/YYYY"
              sx={{ background: "#292929", borderRadius: 1 }}
            />
            <FormControl>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Sex
              </Typography>
              <RadioGroup
                row
                value={client.gender || ""}
                onChange={(e) => handleInputChange("gender", e.target.value)}
              >
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                  sx={{ color: "#CBCBCB" }}
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                  sx={{ color: "#CBCBCB" }}
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid2>

        {/* Contact Info Section */}
        <Grid2 item xs={12} md={6}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Contact Info
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Email"
              value={client.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              sx={{ background: "#292929", borderRadius: 1 }}
            />
            <TextField
              label="Phone"
              value={client.phone || ""}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              sx={{ background: "#292929", borderRadius: 1 }}
            />
          </Box>
        </Grid2>

        {/* Social Link Section */}
        <Grid2 item xs={12}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Social Links
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="VK"
              value={client.vk || ""}
              onChange={(e) => handleInputChange("vk", e.target.value)}
              sx={{ background: "#292929", borderRadius: 1 }}
            />
          </Box>
        </Grid2>
      </Grid2>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ flex: 1 }}
        >
          Save changes
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          sx={{ flex: 1 }}
        >
          Remove User
        </Button>
      </Box>
    </Container>
  );
}
