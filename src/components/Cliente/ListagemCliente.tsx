import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';

import styles from "../../App.module.css";

import axios from 'axios';
import { CadastroClienteInterface } from '../../interfaces/CadatroClienteInterface';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const ListagemCliente = () => {

    const [clientes, setClientes] = useState<CadastroClienteInterface[]>([]);
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

                const response = await axios.post('http://localhost:8000/api/cliente/nome',
                    { nome: pesquisa },
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Tye": "application/json"
                        }
                    }).then(function (response) {
                        if (response.data.status === true){
                        setClientes(response.data.data);
                        }else{
                            setClientes([]);
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

    function handleDelete(id: number) {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Tem certeza?",
            text: "Você não poderá reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, exclua-o!",
            cancelButtonText: "Não, cancele!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Deletado!",
                    text: "O Cliente foi excluido",
                    icon: "success"
                });

                axios.delete('http://127.0.0.1:8000/api/cliente/delete/' + id)
                    .then(function (response) {
                        window.location.href = "/listagemCliente"
                    }).catch(function (error) {
                        console.log("ocorreu um erro")
                    })
            } else if (
               
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "O Cliente não foi excluido",
                    icon: "error"
                });
            }
        });

    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8000/api/cliente/retornarTodos/');
                setClientes(response.data.data);

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
                            <h5 className='table table-hover'>Listagem de Clientes</h5>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientes.map(clientes => (
                                        <tr key={clientes.id}>
                                            {/* <td>{clientes.id}</td> */}
                                            <td>{clientes.nome}</td>
                                            {/* <td>{clientes.celular}</td> */}
                                            <td>{clientes.email}</td>
                                            <td>{clientes.cpf}</td>
                                            {/* <td>{clientes.dataNascimento}</td> */}
                                            <td>{clientes.cidade}</td>
                                            <td>{clientes.estado}</td>
                                            <td>{clientes.pais}</td>
                                            <td>{clientes.rua}</td>
                                            <td>{clientes.bairro}</td>
                                            <td>{clientes.cep}</td>
                                            {/* <td>{clientes.complemento}</td> */}
                                            <td>
                                                <Link to={"/cliente/editar/" + clientes.id} className='btn btn-secondary btn-sm'>Editar</Link>
                                                <a onClick={()=> handleDelete(clientes.id)} className='btn btn-warning btn-sm'>Excluir</a>  </td>
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

export default ListagemCliente;