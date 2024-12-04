import { getClients, setClients } from "../services/clientsService";

const fetchClients = async () => {
  try {
    const data = await getClients();
    setClients(data);
  } catch (err) {
    setError(err.response?.data?.message || "Failed to fetch clients");
  }
};

export default fetchClients;
