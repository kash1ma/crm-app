import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid2,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import BackIcon from "./assets/icons/Back.svg";
import validator from "validator";

export default function UserProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

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

  function handleDelete() {
    setClientToDelete(client.id);
    setShowConfirm(true);
  }

  const confirmDelete = async () => {
    try {
      await deleteClient(clientToDelete);

      setShowConfirm(false);
      setClientToDelete(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete client");
    }
  };
  const cancelDelete = () => {
    setShowConfirm(false);
    setClientToDelete(null);
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

  function handleReturn() {
    navigate("/");
  }

  return (
    <Container sx={{ mt: 6, color: "#fff" }} maxWidth="xxl">
      <Button
        onClick={handleReturn}
        sx={{ position: "relative", color: "white" }}
      >
        <FirstPageIcon></FirstPageIcon>
      </Button>
      <Typography variant="h1" sx={{ fontWeight: "bolder", mb: 4 }}>
        {`${client.name} ${client.surname} ${client.lastName || ""} `} ID{id}
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
        <Dialog
          sx={{
            "& .MuiDialog-paper": {
              backgroundColor: "#1B1B1B",
              width: "424px",
              height: "274px",
              borderRadius: "30px",
            },
          }}
          open={showConfirm}
          onClose={cancelDelete}
        >
          <DialogTitle
            sx={{
              color: "white",
              textAlign: "center",
              marginTop: "25px",
              fontSize: "18px",
            }}
          >
            Удалить клиента
          </DialogTitle>
          <DialogContent
            sx={{
              color: "white",
              textAlign: "center",
              fontSize: "14px",
              maxWidth: "300px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Вы действительно хотите удалить данного клиента?
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              onClick={confirmDelete}
              color="error"
              sx={{
                color: "white",
                borderRadius: "13px",
                padding: "13px",
                width: "150px",
                height: "40px",
                backgroundColor: "#555555",
                fontSize: "14px",
                textTransform: "none",
              }}
            >
              Удалить
            </Button>
            <Button
              onClick={cancelDelete}
              color="primary"
              sx={{
                color: "#8F8F8F",
                fontSize: "12px",
                textTransform: "none",
              }}
            >
              Отмена
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}
