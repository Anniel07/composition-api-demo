import axios from "axios";
export default axios.create({
  baseURL: "https://localhost:44351",
  headers: {
    "Content-type": "application/json"
  }
});