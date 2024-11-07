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
import Teste from './pages/Aaa/Aaa';

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
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/hub" element={<Hub /> }/>
                    <Route path ="/empresas-parceiras" element={<EmpresasParceiras/>}/>
                    <Route path ="/perfil-empresa" element={<PerfilEmpresa/>}/>
                    <Route path="/perfil-beneficiario" element={<PerfilBeneficiario/>}></Route>
                    <Route path="/enviar-proposta1" element={<EnviarProposta1/>}></Route>
                    <Route path="/enviar-proposta2" element={<EnviarProposta2/>}></Route>
                    <Route path="/enviar-proposta3" element={<EnviarProposta3/>}></Route>
                    <Route path="/teste" element={<Teste/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Rotas;