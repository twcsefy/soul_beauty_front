import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroServico from "../components/Servico/CadastroServico";
import ListagemServico from "../components/Servico/ListagemServico";
import EditarServico from "../components/Servico/EditarServico";

import CadastroProfissional from "../components/Profissional/CadastroProfissional";
import EditarProfissional from "../components/Profissional/EditarProfissional";
import ListagemProfissional from "../components/Profissional/ListagemProfissional";

import CadastroCliente from "../components/Cliente/CadastroCliente";
import ListagemCliente from "../components/Cliente/ListagemCliente";
import EditarCliente from "../components/Cliente/EditarCliente";

const AppRouter = () => {
    return (
       <BrowserRouter>
         <Routes>
           <Route path="cadastroServico" element={<CadastroServico />}/>
           <Route path="listagemServico" element={<ListagemServico />}/>
           <Route path="/servico/editar/:id"element={<EditarServico />}/>

           <Route path="cadastroProfissional" element={<CadastroProfissional />}/>
           <Route path="listagemProfissional" element={<ListagemProfissional />}/>
           <Route path="/profissional/editar/:id"element={<EditarProfissional />}/>

           <Route path="cadastroCliente" element={<CadastroCliente />}/>
           <Route path="listagemCliente" element={<ListagemCliente />}/>
           <Route path="/cliente/editar/:id"element={<EditarCliente />}/>


        </Routes>
       </BrowserRouter>
    );
}
 export default AppRouter;