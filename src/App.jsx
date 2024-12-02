import React, { useState, useEffect } from "react";
import { getClients } from "../services/clientsService";

const ClientList = () => {
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

  return (
    <div>
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
};

export default ClientList;
