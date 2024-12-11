import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./UserProfile";
import ClientsTable from "./components/Table";
import { getClients } from "../services/clientsService";
import Header from "./components/Header";
import "./App.css";

function ClientList() {
  return (
    <div sx={{ color: "#141414" }}>
      <Router>
        <Routes>
          <Route index element={<ClientsTable />} />
          <Route path="clients/:id" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default ClientList;
