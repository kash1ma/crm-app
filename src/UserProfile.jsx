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
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [surname, setSurname] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getClientById(id);
        setClient(userData);
        setContacts(userData.contacts || []);
        setName(userData.name || "");
        setLastName(userData.lastName || "");
        setSurname(userData.surname || "");
        console.log(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);

  if (!client) {
    return <div>Loading...</div>;
  }
  console.log(contacts);

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

  const validateForm = () => {
    let tempErrors = {};

    if (validator.isEmpty(name)) {
      tempErrors.name = "Имя обязательно";
    }

    if (validator.isEmpty(surname)) {
      tempErrors.surname = "Фамилия обязательна";
    }

    contacts.forEach((contact, index) => {
      if (validator.isEmpty(contact.value)) {
        tempErrors[`contact${index}`] = "Контакт не может быть пустым";
      } else if (
        contact.type === "email" &&
        !validator.isEmail(contact.value)
      ) {
        tempErrors[`contact${index}`] = "Неверный формат email";
      } else if (
        contact.type === "phone" &&
        !validator.isMobilePhone(contact.value, "any", { strictMode: false })
      ) {
        tempErrors[`contact${index}`] = "Неверный формат телефона";
      }
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const styleInput = {
    "& .MuiInputBase-root": {
      color: "white",
    },
    "& .MuiInputLabel-root": {
      color: "white",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
  };

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

  const handleSubmit = async (e) => {
    if (validateForm()) {
      const updatedClient = {
        id: client.id,
        name,
        lastName,
        surname,
        contacts,
      };

      try {
        await updateClient(client.id, updatedClient);
        console.log("Client updated successfully", updatedClient);
        const refreshedClientData = await getClientById(client.id);

        // Update the state with the fresh data
        setClient(refreshedClientData);
        setContacts(refreshedClientData.contacts || []);
        setName(refreshedClientData.name || "");
        setLastName(refreshedClientData.lastName || "");
        setSurname(refreshedClientData.surname || "");
      } catch (error) {
        console.error("Error updating client:", error);
      }
    } else {
      console.log("Form has errors, please correct them");
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
            sx={{
              fontWeight: "bolder",
              mb: 4,
              fontSize: "5vh",
              textAlign: "center",
            }}
          >
            {`${client.name} ${client.surname} ${client.lastName || ""} `} ID
            {id}
          </Typography>

          <Grid2 container spacing={29}>
            <Grid2
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
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                  error={!!errors.surname}
                  helperText={errors.surname}
                  sx={styleInput}
                />

                <TextField
                  label="Имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={styleInput}
                />

                <TextField
                  label="Отчество"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  sx={styleInput}
                />
              </Box>
            </Grid2>

            <Grid2
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  width: 700,
                }}
              >
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
                          <MenuItem value="email">Емейл</MenuItem>
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
                        error={!!errors[`contact${index}`]}
                        helperText={errors[`contact${index}`]}
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
                        sx={{
                          color: "aqua",
                          marginBottom: 0.2,
                          marginRight: 0.5,
                        }}
                      ></AddCircleOutlineOutlinedIcon>{" "}
                      Добавить контакт
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid2>
          </Grid2>

          <Box sx={{ display: "flex", gap: 1, mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
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
