import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => { // Configurando token para cada requisição
  const jwtToken = localStorage.getItem("jwtToken"); // Criando token para login
  if (jwtToken) {
    config.headers.Authorization = `Bearer ${jwtToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
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

export const dadosUsuarioLogado = (data) => {
  return api.get('/perfis', data);
}

export const buscarPropostas = (data) => {
  return api.get('/propostas');
}

export default api;
