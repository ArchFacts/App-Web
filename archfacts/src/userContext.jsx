import React, { createContext, useContext, useState, useEffect } from 'react';
import { dadosUsuarioLogado } from '../src/api.jsx'; // Altere para o caminho correto de sua API

// Cria o contexto
const UserContext = createContext();

// Componente de provedor do contexto
const UserProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obterDadosUsuarioLogado = async () => {
            try {
                const response = await dadosUsuarioLogado();
                setUsuario(response.data); // Define os dados do usuário no estado
            } catch (error) {
                console.error("Erro ao buscar o usuário", error);
            } finally {
                setLoading(false);
            }
        };

        obterDadosUsuarioLogado();
    }, []);

    return (
        <UserContext.Provider value={{ usuario, setUsuario, loading }}>
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => {
    return useContext(UserContext);
};

export { UserProvider, useUser };
