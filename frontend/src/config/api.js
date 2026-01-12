export const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:4000"
    : "https://kanbanboard-4qy2.onrender.com";
