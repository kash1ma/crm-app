import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api", // Base URL for your API
  timeout: 5000, // Optional: timeout after 5 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
