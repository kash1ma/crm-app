import React, { useState, useEffect } from "react";
import ClientsTable from "./components/Table";
import { Box } from "@mui/material";
import { createClient } from "../services/clientsService";
import { Modal, Button } from "react-bootstrap";
import ClientForm from "./components/CreationForm";

function ClientList() {
  // const [clients, setClients] = useState([]);
  // const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  // const fetchClients = async () => {
  //   try {
  //     const data = await getClients();
  //     setClients(data);
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Failed to fetch clients");
  //   }
  // };

  // useEffect(() => {
  //   fetchClients();
  // }, []);

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  function handleClose() {
    setShow(false);
  }

  function handleShow() {
    setShow(true);
  }

  function handleCreate(data) {
    createClient(data);
  }

  return (
    <div>
      <ClientsTable />
      <div className="d-flex justify-content-center">
        <Button onClick={handleShow}>Добавить клиента</Button>

        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Добавление клиента</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ClientForm onClose={handleClose} />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default ClientList;
