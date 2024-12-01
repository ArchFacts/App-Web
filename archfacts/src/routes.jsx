import React from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroEmpresa from "./pages/Cadastro/Cadastro-Empresa/cadastro_empresa";
import CadastroFuncionario from "./pages/Cadastro/Cadastro-Funcionario/cadastro_funcionario";
import CadastroUsuario from "./pages/Cadastro/Cadastro-Usuario/cadastro_usuario";
import NivelUsuario from "./pages/Nivel-Usuario/nivel_usuario";
import Login from "./pages/Login/login";
import Hub from "./pages/Hub/hub";
import EmpresasParceiras from "./pages/Empresas-Parceiras/empresasParceiras";
import PerfilEmpresa from "./pages/Perfil-Empresa/perfil_empresa";
import PerfilBeneficiario from "./pages/Perfil-Usuario/Beneficiario/perfil_beneficiario";
import EnviarProposta1 from "./pages/Enviar-Proposta/enviar_proposta1";
import EnviarProposta2 from "./pages/Enviar-Proposta/enviar_proposta2";
import EnviarProposta3 from "./pages/Enviar-Proposta/enviar_proposta3";
import EnviarProposta4 from "./pages/Enviar-Proposta/enviar_proposta4";
import AberturaChamados from "./pages/Abertura-Chamados/abertura_chamados";
import Teste from './pages/Aaa/Aaa';
import ChamadosEmpresa from "./pages/Chamados-Empresas/chamados_empresas";
import Eventos from './pages/Eventos/eventos';
import ProjetosBeneficiario from "./pages/Projetos/Beneficiario/projetos_beneficiario";
import ProjetosPrestador from "./pages/Projetos/Prestador/projetos_prestador";
import HomePrestador from './pages/Home-Prestador/homePrestador';
import PerfilFuncionario from "./pages/Perfil-Usuario/Funcionario/perfil_funcionario";
import TarefasPrestador from "./pages/Tarefas-Prestador/tarefas_prestador";
import PerfilPrestador from "./pages/Perfil-Prestador/perfil_prestador";
import ChamadosPrestador from "./pages/Chamados-Prestador/chamados_prestador";

function Rotas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cadastrar/:tipo" element={<CadastroUsuario />} />
                    <Route path="/nivel-usuario" element={<NivelUsuario />} />
                    <Route path='/cadastrar-empresa' element={<CadastroEmpresa />} />
                    <Route path='/cadastrar-funcionario' element={<CadastroFuncionario />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/hub" element={<Hub />} />
                    <Route path="/empresas-parceiras" element={<EmpresasParceiras />} />
                    <Route path="/perfil-empresa" element={<PerfilEmpresa />} />
                    <Route path="/perfil-beneficiario" element={<PerfilBeneficiario />}></Route>
                    <Route path="/enviar-proposta1" element={<EnviarProposta1 />}></Route>
                    <Route path="/enviar-proposta2" element={<EnviarProposta2 />}></Route>
                    <Route path="/enviar-proposta3" element={<EnviarProposta3 />}></Route>
                    <Route path="/abertura-chamados" element={<AberturaChamados />}></Route>
                    <Route path="/teste" element={<Teste />}></Route>
                    <Route path="/chamados-empresa" element={<ChamadosEmpresa />}></Route>
                    <Route path="/eventos" element={<Eventos />}></Route>
                    <Route path="/projetos-beneficiario" element={<ProjetosBeneficiario />} />
                    <Route path="/projetos-prestador" element={<ProjetosPrestador />} />
                    <Route path="/home-prestador" element={<HomePrestador />}></Route>
                    <Route path="/enviar-proposta4" element={<EnviarProposta4 />}></Route>
                    <Route path="/perfil-funcionario" element={<PerfilFuncionario />}></Route>
                    <Route path="/tarefas-prestador" element={<TarefasPrestador />}></Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/hub" element={<Hub />} />
                    <Route path="/empresas-parceiras" element={<EmpresasParceiras />} />
                    <Route path="/perfil-empresa" element={<PerfilEmpresa />} />
                    <Route path="/perfil-beneficiario" element={<PerfilBeneficiario />}></Route>
                    <Route path="/enviar-proposta1/:cod/:nome" element={<EnviarProposta1 />}></Route>
                    <Route path="/enviar-proposta2/:id/:nome" element={<EnviarProposta2 />}></Route>
                    <Route path="/enviar-proposta3/:id/:nome" element={<EnviarProposta3 />}></Route>
                    <Route path="/enviar-proposta4/:id/:nome" element={<EnviarProposta4 />}></Route>
                    <Route path="/abertura-chamados" element={<AberturaChamados />}></Route>
                    <Route path="/teste" element={<Teste />}></Route>
                    <Route path="/chamados-empresa" element={<ChamadosEmpresa />}></Route>
                    <Route path="/eventos" element={<Eventos />}></Route>
                    <Route path="/projetos-beneficiario" element={<ProjetosBeneficiario />} />
                    <Route path="/projetos-prestador" element={<ProjetosPrestador />} />
                    <Route path="/home-prestador" element={<HomePrestador />}></Route>
                    <Route path="/perfil-funcionario" element={<PerfilFuncionario />}></Route>
                    <Route path="/perfil-prestador" element={<PerfilPrestador />} />
                    <Route path="/chamados-prestador" element={<ChamadosPrestador />} />
                    <Route path="/tarefas-prestador/:projetoId" element={<TarefasPrestador />}></Route>
                    <Route path="/chamados-prestador/:projetoId" element={<ChamadosPrestador />}></Route>
                    <Route path="/projetos-beneficiario/:nomeEmpresa" element={<ProjetosBeneficiario />} />
                    <Route path="/chamados-empresa/:projetoId" element={<ChamadosEmpresa />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Rotas;