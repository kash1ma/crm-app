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
import PanoramaWideAngleSelectIcon from "@mui/icons-material/PanoramaWideAngleSelect";

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
        console.log(client);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);

  if (!client) {
    return <div>Loading...</div>;
  }

  function handleDelete() {
    setClientToDelete(client.id);
    setShowConfirm(true);
  }

  const confirmDelete = async () => {
    try {
      await deleteClient(clientToDelete);

      setShowConfirm(false);
      setClientToDelete(null);
      handleReturn();
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

  //const styleinput = {
  //background: "#292929",
  //borderRadius: 4,
  //"& .MuiInputBase-input": {
  //color: "#CBCBCB",
  //},
  //"& .MuiInputLabel-root": {
  //color: "#CBCBCB",
  //},
  //};

  const style = {
    background: "#292929",
    "& .MuiInput-input": {
      color: "white",
    },
    width: 500,
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

  console.log(client);

  const handleInputChange = (e, value) => {
    if (e === "surname") {
      setClient((prev) => ({
        ...prev,
        [e]: value,
      }));
    }
    if (e === "name") {
      setClient((prev) => ({
        ...prev,
        [e]: value,
      }));
    }
    if (e === "lastName") {
      setClient((prev) => ({
        ...prev,
        [e]: value,
      }));
    }
    if(e === "phone"){
      console.log(client.contacts[1].value)
      setClient((prev) => ({
        ...prev,
        [client.contacts[1].value]: value,
      }));
    }
  };

  function handleReturn() {
    navigate("/");
  }

  return (
    <>
      <Button
        onClick={handleReturn}
        sx={{ color: "white", position: "absolute", top: 30, left: 30 }}
      >
        <FirstPageIcon sx={{ width: "2rem", height: "2rem" }}></FirstPageIcon>
      </Button>
      <Container
        sx={{
          color: "#fff",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        maxWidth="xxl"
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1500px", // Adjust the maxWidth as needed
            padding: 4,
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontWeight: "bolder", mb: 4, fontSize: "5vh", textAlign: "center" }}
          >
            {`${client.name} ${client.surname} ${client.lastName || ""} `} ID
            {id}
          </Typography>

          <Grid2 container spacing={29}>
            <Grid2
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
                paddingLeft: "3rem",
                paddingRight: "3rem",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 2,
                  fontSize: 50,
                  margin: "0 auto",
                  fontWeight: "bold",
                }}
              >
                User Info
              </Typography>
              <Box
                sx={{
                  width: 400,
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                  color: "white",
                }}
              >
                <TextField
                  label="Фамилия"
                  value={client.surname}
                  onChange={(e) => handleInputChange("surname", e.target.value)}
                  sx={{
                    
                    "& .MuiInputBase-root": {
                      color: "white", 
                    },
                    "& .MuiInputLabel-root": {
                      color: "white", 
                    },
                    
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white"
                    },
                  }}
                />

                <TextField
                  label="Имя"
                  value={client.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  sx={{
                    "& .MuiInputBase-root": {
                      color: "white",
                    },
                    "& .MuiInputLabel-root": {
                      color: "white", 
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white"
                    },
                  }}
                />

                <TextField
                  label="Отчество"
                  value={client.lastName || ""}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  sx={{
                    "& .MuiInputBase-root": {
                      color: "white", 
                    },
                    "& .MuiInputLabel-root": {
                      color: "white", 
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white"
                    },
                  }}
                />
              </Box>
            </Grid2>

            <Grid2
              item
              xs={12}
              md={6}
              sx={{ display: "flex", flexDirection: "column", gap: 5 }}
            >
              <Typography
                variant="h5"
                sx={{
                  mt: 6,
                  fontSize: 50,
                  margin: "0 auto",
                  fontWeight: "bold",
                }}
              >
                Contact Info
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: 400 }}>
                <TextField
                  label="Email"
                  value={client.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  sx={{
                    "& .MuiInputBase-root": {
                      color: "white", 
                    },
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white"
                    },
                  }}
                />
                <TextField
                  label="Phone"
                  value={client.contacts[1].value || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  sx={{
                    "& .MuiInputBase-root": {
                      color: "white", 
                    },
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white"
                    },
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    fontSize: 50,
                    fontWeight: "bold",
                    margin: "0 auto",
                    marginTop: 3,
                  }}
                >
                  Social Links
                </Typography>
                <TextField
                  label="VK"
                  value={client.vk || ""}
                  onChange={(e) => handleInputChange("vk", e.target.value)}
                  sx={{
                    "& .MuiInputBase-root": {
                      color: "white", 
                    },
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white"
                    },
                  }} 
                />
              </Box>
            </Grid2>
          </Grid2>

          
          <Box sx={{ display: "flex", gap: 1, mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{
                background: "#303030",
                height: 90,
                fontSize: 24,
                borderRadius: 5,
                padding: "0 7rem 0 7rem",
              }}
            >
              Save changes
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              sx={{
                background: "#611B1B",
                fontSize: 16,
                borderRadius: 10,
                height: 50,
                marginTop: 3.5,
                padding: "2rem",
              }}
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
        </Box>
      </Container>
    </>
  );
}
