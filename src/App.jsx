import React, { useState, useEffect } from "react";
import ClientsTable from "./components/Table"

function ClientList() {
  // const [clients, setClients] = useState([]);
  // const [error, setError] = useState(null);
  // const [show, setShow] = useState(false);
  // const [isLoading, setIsLoading] = useState(true)
  
  
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

  // function handleClose() {
  //   setShow(false);
  //   fetchClients();
  // }

  // function handleShow() {
  //   setShow(true);
  // }

  // function handleDelete(id) {
  //   deleteClient(id)
  //     .then(() => {
  //       setClients((prevClients) =>
  //         prevClients.filter((client) => client.id !== id)
  //       );
  //       console.log("Client successfully deleted");
  //     })
  //     .catch((err) => {
  //       setError(err.response?.data?.message || "Failed to delete client");
  //     });
  //   fetchClients();
  //   console.log("Client successfully deleted");
  // }

  // function handleCreate(data) {
  //   createClient(data);
  // }

  return (
    <ClientsTable />

    // <div>
    //   <Container>
    //     <Table striped bordered hover>
    //       <thead>
    //         <tr>
    //           <th>ID</th>
    //           <th>Фамилия Имя Отчество</th>
    //           <th>Дата и время создания</th>
    //           <th>Последние изменения</th>
    //           <th>Контакты</th>
    //           <th>Действия</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {clients.map((client) => (
    //           <tr key={client.id}>
    //             <td>{client.id}</td>
    //             <td>{`${client.name} ${client.surname} ${
    //               client.lastName || ""
    //             }`}</td>
    //             <td>{`${extractDateTime(client.createdAt).date} ${
    //               extractDateTime(client.createdAt).time
    //             }`}</td>
    //             <td>{`${extractDateTime(client.updatedAt).date} ${
    //               extractDateTime(client.updatedAt).time
    //             }`}</td>
    //             <td>{client.contacts}</td>
    //             <td className="d-inline-flex p-2">
    //               <Button variant="info">Изменить</Button>
    //               <Button
    //                 variant="danger"
    //                 onClick={() => handleDelete(client.id)}
    //               >
    //                 Удалить
    //               </Button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </Table>
    //   </Container>
    //   <div className="d-flex justify-content-center">
    //     <Button onClick={handleShow}>Добавить клиента</Button>

    //     <Modal show={show} onHide={handleClose} size="lg">
    //       <Modal.Header closeButton>
    //         <Modal.Title>Добавление клиента</Modal.Title>
    //       </Modal.Header>
    //       <Modal.Body>
    //         <ClientForm onClose={handleClose} />
    //       </Modal.Body>
    //     </Modal>
    //   </div>
    // </div>
  );
}

export default ClientList;
