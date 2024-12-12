import { useState, useEffect, useMemo } from "react";
import { getClients, deleteClient } from "../../services/clientsService";
import sortByName from "../../utility/sortByName";
import sortById from "../../utility/sortById";
import sortByDate from "../../utility/sortByDate";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import extractDateTime from "../../utility/extractDateTime";
import ClientForm from "./CreationForm";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Button,
  Box,
  Modal,
  Fade,
  Dialog,
  Tooltip,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Header from "./Header";

import VkIcon from "../assets/icons/vk.svg";
import PhoneIcon from "../assets/icons/Phone icon.svg";
import GitIcon from "../assets/icons/Git icon.svg";
import FacebookIcon from "../assets/icons/fb.svg";
import EmailIcon from "../assets/icons/email.svg";

import CloseIcon from "@mui/icons-material/Close";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import { Margin } from "@mui/icons-material";
import UpdateForm from "./UpdateForm";

import { Fade } from "@mui/material";

const style = {
  margin: "0 auto",
  marginTop: 15,
  width: 550, // эквивалент size="lg"
  bgcolor: "#1B1B1B",
  boxShadow: 24,
  borderRadius: "10px 10px 40px 40px",
};

const ClientsTable = () => {
  const headers = [
    {
      id: "id",
      label: "id",
      sort() {
        handleSort("id");
      },
    },
    {
      id: "name",
      label: "Имя Фамилия Отчество",
      sort() {
        handleSort("name");
      },
    },
    {
      id: "createTime",
      label: "Дата и время создания",
      sort() {
        handleSort("createTime");
      },
    },
    {
      id: "lastChange",
      label: "Последние изменения",
      sort() {
        handleSort("lastChange");
      },
    },
    {
      id: "id",
      label: "Контакты",
    },
    {
      id: "id",
      label: "Действия",
    },
  ];

  const icons = {
    email: EmailIcon,
    Facebook: FacebookIcon,
    Other: GitIcon,
    phone: PhoneIcon,
    VK: VkIcon,
  };

  const [clients, setClients] = useState([]);
  const [updatedClient, setUpdatedClient] = useState([]);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [sortConfigId, setSortConfigId] = useState({
    direction: "ascending",
  });
  const [sortConfigName, setSortConfigName] = useState({
    direction: "ascending",
  });
  const [sortConfigCreatedTime, setSortConfigCreatedTime] = useState({
    direction: "ascending",
  });
  const [sortConfigLastChange, setSortConfigLastChange] = useState({
    direction: "ascending",
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchClients = async () => {
    try {
      setIsLoading(true);
      const data = await getClients();
      setClients(data);
      console.log(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch clients");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  function handleClose() {
    setShow(false);
    fetchClients();
  }

  function handleShow() {
    setShow(true);
    return <ClientForm />;
  }

  const handleEdit = (client) => {
    setUpdatedClient(client);
    setShowEdit(true);
    return <UpdateForm onClose={handleCloseEdit} client={client} />;
  };

  function handleCloseEdit() {
    setShowEdit(false);
    fetchClients();
  }

  function handleSort(column) {
    if (column === "id") {
      const direction =
        sortConfigId.direction === "ascending" ? "descending" : "ascending";
      setSortConfigId({ direction });
      setClients(sortById(clients, direction));
    }
    if (column === "name") {
      const direction =
        sortConfigName.direction === "ascending" ? "descending" : "ascending";
      setSortConfigName({ direction });
      setClients(sortByName(clients, direction));
    }
    if (column === "createTime") {
      const direction =
        sortConfigCreatedTime.direction === "ascending"
          ? "descending"
          : "ascending";
      setSortConfigCreatedTime({ direction });
      setClients(sortByDate(clients, "createdAt", direction));
    }
    if (column === "lastChange") {
      const direction =
        sortConfigLastChange.direction === "ascending"
          ? "descending"
          : "ascending";
      setSortConfigLastChange({ direction });
      setClients(sortByDate(clients, "updatedAt", direction));
    }
  }

  function handleDelete(id) {
    setClientToDelete(id);
    setShowConfirm(true);
  }

  const confirmDelete = async () => {
    try {
      await deleteClient(clientToDelete);
      setClients((prevClients) =>
        prevClients.filter((client) => client.id !== clientToDelete)
      );
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
  if (isLoading)
    return (
      <Box minHeight="xl" sx={{ position: "relative" }}>
        <CircularProgress
          sx={{ position: "absolute", left: "50%", top: "50vh", color: "red" }}
          color="blue"
        />
      </Box>
    );

  return (
    <>
      <Header />
      <Container sx={{ mt: 6 }} maxWidth="xl">
        <Typography
          variant="h2"
          component="h1"
          paddingTop={"2rem"}
          gutterBottom
          align="left"
          sx={{ color: "white" }}
        >
          Клиенты
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell
                    sx={{
                      textAlign: "center",
                      bgcolor: "#212121",
                      color: "white",
                    }}
                    key={index}
                  >
                    {Object.keys(header).includes("sort") ? (
                      <Button
                        onClick={() => handleSort(header.id)}
                        sx={{
                          textAlign: "center",
                          bgcolor: "#212121",
                          color: "white",
                        }}
                      >
                        {header.label}
                      </Button>
                    ) : (
                      header.label.toUpperCase()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow
                  key={client.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#3E3E3E",
                      "& .MuiTableCell-root": {
                        color: "#FFFFFF",
                      },
                    },
                  }}
                >
                  <TableCell sx={{ textAlign: "center" }}>
                    {client.id}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{`${client.name} ${
                    client.surname
                  } ${client.lastName || ""}`}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {`${extractDateTime(client.createdAt).date}`}{" "}
                    {
                      <span style={{ color: "#B0B0B0", marginLeft: "3px" }}>{`${
                        extractDateTime(client.createdAt).time
                      }`}</span>
                    }
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {`${extractDateTime(client.updatedAt).date}`}{" "}
                    {
                      <span style={{ color: "#B0B0B0", marginLeft: "3px" }}>{`${
                        extractDateTime(client.updatedAt).time
                      }`}</span>
                    }
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Box
                      sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                    >
                      {Array.from(JSON.parse(client.contacts)).map((item) => (
                        <Tooltip
                          key={item.type}
                          title={
                            <Typography sx={{ color: "white" }}>
                              {item.value || "Unknown"}
                            </Typography>
                          }
                          placement="top"
                          arrow
                        >
                          <img
                            key={item.type}
                            style={{
                              height: "3.5vh",
                              aspectRatio: 1,
                              color: "blue",
                              cursor: "pointer",
                            }}
                            src={icons[item.type]}
                            alt=""
                          />
                        </Tooltip>
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button onClick={() => handleEdit(client)}>
                      <EditIcon sx={{ color: "inherit" }} />
                    </Button>
                    <Button onClick={() => handleDelete(client.id)}>
                      <DeleteIcon sx={{ color: "red" }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
      </Container>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Modal
          open={showEdit}
          onClose={handleCloseEdit}
          aria-labelledby="modal-title"
          sx={{ overflow: "scroll" }}
        >
          <Box
            sx={{
              ...style,
              transform: "translateY(20px)",
              transition: "transform 0.3s ease-out",
            }}
          >
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              sx={{
                padding: "3rem 0 0 2rem",
                fontSize: 35,
                color: "white",
              }}
            >
              Обновить данные
            </Typography>
            <Button
              onClick={handleCloseEdit}
              sx={{
                position: "relative",
                top: -70,
                left: 477,
                color: "white",
              }}
            >
              <CloseIcon
                sx={{
                  height: "3rem",
                  width: "3rem",
                }}
              ></CloseIcon>
            </Button>
            <UpdateForm onClose={handleCloseEdit} client={updatedClient} />
          </Box>
        </Modal>
        <Button
          variant="contained"
          onClick={handleShow}
          sx={{
            marginTop: "2rem",
            background: "white",
            border: "1px solid #6D92D6",
            height: "44px",
            width: "216px",
            color: "#6D92D6",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.5,
            backgroundColor: "#212121",
          }}
        >
          <PersonAddAlt1Icon sx={{ marginTop: "-0.3rem" }}></PersonAddAlt1Icon>
          Добавить клиента
        </Button>

        <Modal
          open={show}
          onClose={handleClose}
          aria-labelledby="modal-title"
          sx={{ overflow: "scroll" }}
        >
          <Fade in={show}>
            <Box sx={style}>
              <Typography
                id="modal-title"
                variant="h6"
                component="h2"
                sx={{ padding: "3rem 0 0 2rem", fontSize: 35, color: "white" }}
              >
                Новый пользователь
              </Typography>
              <Button
                onClick={handleClose}
                sx={{
                  position: "relative",
                  top: -70,
                  left: 477,
                  color: "white",
                }}
              >
                <CloseIcon
                  sx={{
                    height: "3rem",
                    width: "3rem",
                  }}
                ></CloseIcon>
              </Button>
              <ClientForm onClose={handleClose} />
            </Box>
          </Fade>
        </Modal>
      </Box>
    </>
  );
};

export default ClientsTable;
