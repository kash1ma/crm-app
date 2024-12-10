import { useState, useEffect } from "react";
import {
  getClients,
  deleteClient,
  createClient,
} from "../../services/clientsService";
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
  Paper,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Button,
  Box,
  Modal,
} from "@mui/material";

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
    { label: "ID", sortable: true },
    { label: "Name", sortable: true },
    { label: "Created At", sortable: true },
    { label: "Updated At", sortable: true },
    { label: "Contacts", sortable: false },
    { label: "Actions", sortable: false },
  ];

  const icons = {
    Email: EmailIcon,
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
  const [sortConfig, setSortConfig] = useState({
    direction: "asc",
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

  function handleSort(column) {}

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

  if (isLoading)
    return (
      <Box minHeight="xl" sx={{ position: "relative" }}>
        <CircularProgress
          sx={{ position: "absolute", left: "50%", top: "50vh" }}
          color="blue"
        />
      </Box>
    );

  return (
    <>
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
                        <img
                          key={item.type}
                          style={{
                            height: "2.5vh",
                            aspectRatio: 1,
                            color: "blue",
                          }}
                          src={icons[item.type]}
                          alt=""
                        />
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
