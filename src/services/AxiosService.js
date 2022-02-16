import axios from "axios";

// Creamos la base de las peticiones, con los datos necesarios
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
      'x-api-key': process.env.VUE_APP_SECRET_CODE
    }
});



// Exportamos los métodos para las peticiones
export default {
  getPlayers(params) {
    return apiClient.get("/players",{
        params: params
    });
  },
  getPlayersByTeam(params) {
    return apiClient.post("/team",params);
  },
};