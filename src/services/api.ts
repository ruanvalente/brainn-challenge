import axios from "axios";

export const api = axios.create({
  baseURL: "https://brainn-api-loterias.herokuapp.com/api/v1",
});
