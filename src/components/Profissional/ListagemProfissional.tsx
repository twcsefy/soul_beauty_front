import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';

import styles from "../../App.module.css";

import axios from 'axios';
import { CadastroProfissionalInterface } from '../../interfaces/CadastroProfissionalInterface';
import { Link } from 'react-router-dom';

const ListagemProfissional = () => {

    const [profissionals, setProfissionals] = useState<CadastroProfissionalInterface[]>([]);
    const [pesquisa, setPesquisa] = useState<string>('');
    const [error, setError] = useState("");

    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "pesquisa") {
            setPesquisa(e.target.value);
        }
    }

    const buscar = (e: FormEvent) => {
        e.preventDefault();

        async function fetchData() {
            try {

                const response = await axios.post('http://localhost:8000/api/profissioal/nome',
                    { nome: pesquisa },
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Tye": "application/json"
                        }
                    }).then(function (response) {
                        if (response.data.status === true){
                        setProfissionals(response.data.data);
                        }else{
                            setProfissionals([]);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8000/api/profissional/retornarTodos/');
                setProfissionals(response.data.data);

            } catch (error) {
                setError("Ocorreu um erro");
                console.log(error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <main className={styles.main}>
                <div className='container'>

                    <div className='col-md mb-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Pesquisar</h5>
                                <form onSubmit={buscar} className='row'>
                                    <div className='col-10'>
                                        <input type="text" name='pesquisa' className='form-control' onChange={handleState} />
                                    </div>
                                    <div className='col-1'>
                                        <button type='submit' className='btn btn-success'>Pesquisar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='table table-hover'>Listagem de Profissionais</h5>
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                   {/* <th>ID</th> */}
                                   <th>Nome</th>
                                        {/* <th>Celular</th> */}
                                        <th>E-mail</th>
                                        <th>CPF</th>
                                        {/* <th>Data de Nascimento</th> */}
                                        <th>Cidade</th>
                                        <th>Estado</th>
                                        <th>País</th>
                                        <th>Rua</th>
                                        <th>Bairro</th>
                                        <th>CEP</th>
                                        {/* <th>Complemento</th> */}
                                        <th>Salário</th>    
                                    </tr>
                                </thead>
                                <tbody>
                                {profissionals.map(profissionals => (
                                        <tr key={profissionals.id}>
                                            {/* <td>{profissionals.id}</td> */}
                                            <td>{profissionals.nome}</td>
                                            {/* <td>{profissionals.celular}</td> */}
                                            <td>{profissionals.email}</td>
                                            <td>{profissionals.cpf}</td>
                                            {/* <td>{profissionals.dataNascimento}</td> */}
                                            <td>{profissionals.cidade}</td>
                                            <td>{profissionals.estado}</td>
                                            <td>{profissionals.pais}</td>
                                            <td>{profissionals.rua}</td>
                                            <td>{profissionals.numero}</td>
                                            <td>{profissionals.bairro}</td>
                                            <td>{profissionals.cep}</td>
                                            {/* <td>{profissionals.complemento}</td> */}
                                            <td>{profissionals.salario}</td>


                                            <td>
                                            <Link to={"/profissional/editar/" + profissionals.id} className='btn btn-primary btn-sm'>Editar</Link>
                                                <a href="#" className='btn btn-danger btn-sm'>Excluir</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );

    
}

export default ListagemProfissional;