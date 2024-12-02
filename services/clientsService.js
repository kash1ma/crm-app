import apiClient from "./apiClient";

// Fetch all clients with optional search query
export const getClients = async (search = "") => {
  const response = await apiClient.get("/clients", {
    params: { search },
  });
  return response.data;
};

// Fetch a single client by ID
export const getClientById = async (id) => {
  const response = await apiClient.get(`/clients/${id}`);
  return response.data;
};

// Create a new client
export const createClient = async (client) => {
  const response = await apiClient.post("/clients", client);
  return response.data;
};

// Update an existing client
export const updateClient = async (id, client) => {
  const response = await apiClient.patch(`/clients/${id}`, client);
  return response.data;
};

// Delete a client
export const deleteClient = async (id) => {
  const response = await apiClient.delete(`/clients/${id}`);
  return response.data;
};
