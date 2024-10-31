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
import PerfilBeneficiario from "./pages/Perfil-Usuario/Beneficiario/perfil_beneficiario";
import EnviarProposta1 from "./pages/Enviar-Proposta/Enviar-Proposta-Tela1/enviar_proposta1";

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
                    <Route path="/perfil-beneficiario" element={<PerfilBeneficiario/>}></Route>
                    <Route path="/enviar-proposta1" element={<EnviarProposta1/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Rotas;