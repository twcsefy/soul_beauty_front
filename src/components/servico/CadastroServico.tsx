import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Header from '../Header';
import styles from '../../App.module.css';
import axios from 'axios';
import FooterServico from './FooterServico';

const CadastroServico = () => {

    const [nome, setNome] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [duracao, setDuracao] = useState<string>("");
    const [preco, setPreco] = useState<string>("");

    const cadastroServico = (e: FormEvent) => {
        e.preventDefault();

        const dados = {
            nome: nome,
            descricao: descricao,
            duracao: duracao,
            preco: preco
        }

        axios.post('http://localhost:8000/api/servico/store', 
        dados,
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(function(response){
            console.log(response.data)
          window.location.href = "/listagemServico";
        }).catch(function(error){
            console.log(error);
        });

    }

    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "nome"){
            setNome(e.target.value);
        }

        if(e.target.name === "descricao"){
            setDescricao(e.target.value)
        }

        if(e.target.name === "duracao"){
            setDuracao(e.target.value)
        }

        if(e.target.name === "preco"){
            setPreco(e.target.value)
        }
    }

    return(
        <div>
            <Header />
            <main className={styles.main}>
                <div className='container'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Cadastrar Serviços</h5>
                            <form onSubmit={cadastroServico} className='row g-3'>

                                <div className='col-6'>
                                    <label htmlFor="nome" className='form-label'>Nome</label>
                                    <input type="text" 
                                    name="nome"
                                    className="form-control"
                                    required
                                    onChange={handleState}
                                    />
                                </div>

                                <div className='col-6'>
                                    <label htmlFor="descricao" className='form-label'>Descrição</label>
                                    <input type="text" 
                                    name="descricao"
                                    className="form-control"
                                    required
                                    onChange={handleState}
                                    />
                                    </div>

                                    <div className='col-6'>
                                    <label htmlFor="duracao" className='form-label'>Duração</label>
                                    <input type="text" 
                                    name="duracao"
                                    className="form-control"
                                    required
                                    onChange={handleState}
                                    />
                                    </div>

                                    <div className='col-6'>
                                    <label htmlFor="preco" className='form-label'>Preço</label>
                                    <input type="text" 
                                    name="preco"
                                    className="form-control"
                                    required
                                    onChange={handleState}
                                    />
                                    </div>

                                    <div className='col-12'>
                                <button
                                type='submit'
                                className='btn btn-success btn-sm'>Cadastrar</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <FooterServico />
        </div>
    );
}

export default CadastroServico;