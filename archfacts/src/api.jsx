import axios from 'axios';


const api = axios.create({
  baseURL: '/api',
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
  return api.get('/propostas', data);
}

export const buscarEmpresas = (data) => {
  return api.get('/negocios', data);
}

export const imagemGenerica = (texto) => {
  return `https://placehold.co/600x400/black/white?text=${encodeURIComponent(texto)}`;
}

export const imagemServicoGenerica = () => {
  return `https://picsum.photos/300/300`;
}

export const encontrarEmpresaProposta = (codEmpresa) => {
  return api.get(`/propostas/buscarNegocioProposta/${codEmpresa}`);
}

export const registroProposta = (data, codEmpresa, nomeNegocio) => {
  return api.post(`propostas/${codEmpresa}/${nomeNegocio}`, data);
}

export const dadosConfirmacaoProposta = (data, codEmpresa, nomeNegocio) => {
  return api.get(`propostas/${codEmpresa}/${nomeNegocio}`, data);
}

export const registroServico = (data) => {
  return api.post(`/servicos`, data);
}

export const obterServicosEmpresa = (codEmpresa) => {
  return api.get(`/servicos/${codEmpresa}`);
}

export const obterDonoNegocio = (codEmpresa) => {
  return api.get(`/negocios/${codEmpresa}`);
}

export const cadastrarPropostaServico = (data) => {
  return api.post(`/propostaServicos`, data);
}

export const recusarProposta = (data) => {
  return api.post(`/propostas/recusar`, data);
}

export const aceitarProposta = (data) => {
  return api.post(`/projetos/aceitar`, data);
}

export const buscarProjetosNegocio = (data) => {
  return api.get(`/projetos`, data);
}

export const buscarTarefasNegocio = (idProjeto) => {
  return api.get(`/tarefas/${idProjeto}`, idProjeto);
}

export const cadastrarTarefa = (idProjeto, data) => {
  return api.post(`/tarefas/${idProjeto}`, data);
}

export const buscarProjetosBeneficiario = (nomeEmpresa, email) => {
  return api.get(`/projetos/beneficiario/${nomeEmpresa}`, email);
}

export const buscarChamadosNegocio = (idProjeto) => {
  return api.get(`/chamados/${idProjeto}`, idProjeto);
}

export const cadastrarChamado = (idProjeto, data) => {
  return api.post(`/chamados/${idProjeto}`, data);
}

export const buscarServicosProposta = (idProposta) => {
  return api.post(`/propostaServicos/buscar`, idProposta);
};

export const definirCusto = (idChamado, data) => {
  return api.put(`/chamados`, idChamado, data);
}

export const definirParcela = (idProjeto, parcela) => {
  return api.post(`/parcelas/${idProjeto}`, parcela);
}

export const buscarLucros = (idProjeto) => {
  return api.get(`/chamados/dashboard/${idProjeto}`);
}

export const buscarResumoFinanceiroDashboard = (idProjeto) => {
  return api.get(`/dashboards/${idProjeto}/resumo-financeiro`)
}

export const buscarTarefaMaiorDespesa = (idProjeto) => {
  return api.get(`/kpis/${idProjeto}/tarefa-maior-despesa`)
}

export const buscarChamadoMaiorLucro = (idProjeto) => {
  return api.get(`/kpis/${idProjeto}/chamado-maior-lucro`)
}

export const atualizarPerfilBeneficiario = (data) => {
  return api.put(`/perfis`, data);
}

export const atualizarPerfilPrestador = (data) => {
  return api.put(`/perfis/prestador`, data);
}

export const buscarNomeProjeto = (idProjeto) => {
  return api.get(`projetos/nome/${idProjeto}`);
}

export const buscarTodasTarefas = () => {
  return api.get(`/tarefas/todos`);
}

export const buscarTodosChamados = () => {
  return api.get(`/chamados/todos`);
}

export const buscarTodosProjetosUsuario = () => {
  return api.get(`/projetos/todos/usuario`);
}

export const buscarTodosProjetosNegocio = () => {
  return api.get(`/projetos/todos/negocio`);
}

export const buscarEventos = () => {
  return api.get(`/eventos`);
}

export default api;