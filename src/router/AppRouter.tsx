import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroServico from "../components/servico/CadastroServico";
import ListagemServico from "../components/servico/ListagemServico";
import CadastroProfissional from "../components/profissionais/CadastroProfissional";
import ListagemProfissional from "../components/profissionais/ListagemProfissional";
import EditarServico from "../components/servico/EditarServico";
import EditarProfissional from "../components/profissionais/EditarProfissionais";
import CadastroCliente from "../components/Clientes/CadastroCliente";
import ListagemCliente from "../components/Clientes/ListagemCliente";
import EditarCliente from "../components/Clientes/EditarCliente";

const AppRouter = () => {
    return (
       <BrowserRouter>
         <Routes>
           <Route path="cadastroServico" element={<CadastroServico />}/>
           <Route path="listagemServico" element={<ListagemServico />}/>
           <Route path="/servico/editar/:id"element={<EditarServico />}/>

           <Route path="cadastroProfissionais" element={<CadastroProfissional />}/>
           <Route path="listagemProfissionais" element={<ListagemProfissional />}/>
           <Route path="/profissionais/editar/:id"element={<EditarProfissional />}/>

           <Route path="cadastroCliente" element={<CadastroCliente />}/>
           <Route path="listagemCliente" element={<ListagemCliente />}/>
           <Route path="/cliente/editar/:id"element={<EditarCliente />}/>


        </Routes>
       </BrowserRouter>
    );
}
 export default AppRouter;