import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroServico from "../components/servico/CadastroServico";
import ListagemServico from "../components/servico/ListagemServico";
import ListagemProfissional from "../components/profissionais/ListagemProfissional";
import CadastroProfissional from "../components/profissionais/CadastroProfissional";

const AppRouter = () => {
    return (
       <BrowserRouter>
         <Routes>
           <Route path="cadastroServico" element={<CadastroServico />}></Route>
           <Route path="listagemServico" element={<ListagemServico  />}></Route>

           <Route path="cadastroProfissional" element={<CadastroProfissional />}/>
           <Route path="listagemProfissional" element={<ListagemProfissional  />}/>

        </Routes>
       </BrowserRouter>
    );
}
 export default AppRouter;