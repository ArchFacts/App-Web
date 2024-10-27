import React from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroEmpresa from "./pages/Cadastro/Cadastro-Empresa/cadastro_empresa";
import CadastroFuncionario from "./pages/Cadastro/Cadastro-Funcionario/cadastro_funcionario";
import CadastroUsuario from "./pages/Cadastro/Cadastro-Usuario/cadastro_usuario";
import NivelUsuario from "./pages/Nivel-Usuario/nivel_usuario";
import Login from "./pages/Login/login";

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
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Rotas;