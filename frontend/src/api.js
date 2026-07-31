import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000",
});

export const generatePRD = async (rawInput) => {
  const response = await API.post("/generate-prd", {
    raw_input: rawInput,
  });

  return response.data;
};
