import React, { useState, useEffect } from "react";
import { getClients } from "../services/clientsService";
import { Table, Container } from "react-bootstrap";

function ClientList() {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients();
        setClients(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch clients");
      }
    };

    fetchClients();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(clients);

  return (
    <div>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Surname</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{`${client.name} ${client.surname} ${
                  client.lastName || ""
                }`}</td>
                <td>{Date(client.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <h1>Client List</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            {client.name} {client.surname}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientList;
