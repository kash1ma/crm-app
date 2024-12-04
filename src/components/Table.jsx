import { useState, useEffect } from "react";
import {
  getClients,
  deleteClient,
  createClient,
} from "../../services/clientsService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import extractDateTime from "../../utility/extractDateTime";
import ClientForm from "./CreationForm"
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
  Box
} from "@mui/material";

const ClientsTable = () => {
  const headers = [
    "ID",
    "Фамилия Имя Отчество",
    "Дата и время создания",
    "Последние изменения",
    "Контакты",
    "Действия",
  ];

  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchClients = async () => {
      try {
        setIsLoading(true)
      const data = await getClients();
      setClients(data);
      console.log(data)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch clients");
    } finally {
        setIsLoading(false)
        
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
  }

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

  function handleCreate(data) {
    createClient(data);
  }
  if (isLoading) return <Box minHeight="xl" sx={{ position: "relative"}}><CircularProgress sx={{ position: "absolute", left: "50%", top : "50vh"}} color="blue" /></Box>;

  return (
    <Container sx={{ mt: 6 }} maxWidth="xl">
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Список Клиентов
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell sx={{ textAlign: "center", bgcolor: "#212121", color: "#B0B0B0"}}  key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell sx={{ textAlign: "center"}}>{client.id}</TableCell>
                <TableCell sx={{ textAlign: "center"}}>{`${client.name} ${client.surname} ${client.lastName || ""}`}</TableCell>
                <TableCell sx={{ textAlign: "center"}}>{`${extractDateTime(client.createdAt).date} ${extractDateTime(client.createdAt).time}`}</TableCell>
                <TableCell sx={{ textAlign: "center"}}>{`${extractDateTime(client.updatedAt).date} ${extractDateTime(client.updatedAt).time}`}</TableCell>
                <TableCell sx={{ textAlign: "center"}}>{client.contacts}</TableCell>
                <TableCell sx={{ textAlign: "center"}}>
                  {
                    <Button>
                      <EditIcon />
                    </Button>
                  }
                  {
                    <Button>
                      <DeleteIcon sx={{ color: "red" }} />
                    </Button>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ClientsTable;
