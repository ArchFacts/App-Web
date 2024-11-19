import axios from 'axios';

const jwtToken = localStorage.getItem("jwtToken");

const api = axios.create({
  baseURL: 'http://localhost:8080', 
  headers: {
    'Content-Type': 'application/json', 
    Authorization: `Bearer ${jwtToken}`,
  },
  withCredentials: true, 
});

export const registroUsuario = (data) => {
  return api.post('/auth/registro', data); 
};

export const loginUsuario = (data) => {
  return api.post('/auth/login', data); 
};

export const registroEmpresa = (data) => {
  return api.post('/negocios', data);
}


export default api;
