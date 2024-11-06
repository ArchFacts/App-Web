import axios from 'axios';

// Criação de uma instância do Axios com configuração comum
const api = axios.create({
  baseURL: 'http://127.0.01:8080', // URL base da API
  headers: {
    'Content-Type': 'application/json', // Cabeçalhos comuns para todas as requisições
  },
  withCredentials: true, // Se você precisa enviar cookies ou credenciais
});

// Função para registro de usuário
export const registroUsuario = (data) => {
  return api.post('/auth/registro', data); // Envia os dados de cadastro para o backend
};

// Função para login de usuário
export const loginUsuario = (data) => {
  return api.post('/auth/login', data); // Envia os dados de login para o backend
};

// Exportação da instância do axios para caso você precise usar outras requisições diretamente
export default api;
