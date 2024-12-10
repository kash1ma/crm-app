import React, { useState, useEffect } from "react";
import ClientsTable from "./components/Table";
import { Box } from "@mui/material";
import { createClient } from "../services/clientsService";
import { Modal, Button } from "react-bootstrap";
import ClientForm from "./components/CreationForm";
import Header from "./components/Header";
import { getClients } from "../services/clientsService";
import './app.css'

function ClientList() {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const fetchClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch clients");
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

  function handleCreate(data) {
    createClient(data);
  }

  return (
    <div sx={{ color: "#141414" }}>
      <Header />

      <ClientsTable />
    </div>
  );
}

export default ClientList;
