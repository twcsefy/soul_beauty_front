import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from "react";
import FooterServico from "./FooterServico";
import Header from "./HeaderServico";
import styles from "../../App.module.css"
import { useParams } from "react-router-dom";
import axios from "axios";


const EditarServico = () => {

    const [nome, setNome] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [duracao, setDuracao] = useState<string>("");
    const [preco, setPreco] = useState<string>("");
    const [id, setId] = useState<number>();

    const parametro = useParams();

    const atualizar = (e: FormEvent) => {
        e.preventDefault();

        const dados = {
            id: id,
            nome: nome,
            descricao: descricao,
            duracao: duracao,
            preco: preco
        }

        axios.put("http://127.0.0.1:8000/api/servico/update",
        dados,
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(function(response){
            window.location.href = "/listagemServico";
        }).catch(function(error){
            console.log('Ocorreu um erro ao atualizar');
        });
    }

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await axios.get("http://127.0.0.1:8000/api/servico/find/" + parametro.id);
                setNome(response.data.data.nome);
                setDescricao(response.data.data.descricao);
                setDuracao(response.data.data.duracao);
                setPreco(response.data.data.preco);
                setId(response.data.data.id);

            } catch(error){
                console.log("erro ao buscar dados de api");
            }
        }
        fetchData();
    }, []);


    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "nome"){
            setNome(e.target.value);
        }
        if(e.target.name === "descricao"){
            setDescricao(e.target.value);
        }
        if(e.target.name === "duracao"){
            setDuracao(e.target.value);
        }
        if(e.target.name === "preco"){
            setPreco(e.target.value);
        }
    }


    return (
        <div>
            <Header />
            <main className={styles.main}>
                <div className='container'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Cadastrar Serviços</h5>
                            <form onSubmit={atualizar} className='row g-3'>
                                <div className='col-6'>
                                    <label htmlFor="nome" className='form-label'>Nome</label>
                                    <input type="text"
                                        name='nome'
                                        className='form-control'
                                        required
                                        onChange={handleState}
                                        value={nome}
                                    />

                                </div>
                                <div className='col-6'>
                                    <label htmlFor="descricao" className='form-label'>Descrição</label>
                                    <input type="text"
                                        name='descricao'
                                        className='form-control'
                                        required
                                        onChange={handleState}
                                        value={descricao}
                                    />

                                </div>
                                <div className='col-6'>
                                    <label htmlFor="duracao" className='form-label'>Duração</label>
                                    <input type="text"
                                        name='duracao'
                                        className='form-control'
                                        required
                                        onChange={handleState}
                                        value={duracao}
                                    />
                                </div>

                                <div className='col-6'>
                                    <label htmlFor="preco" className='form-label'>Preço</label>
                                    <input type="text"
                                        name='preco'
                                        className='form-control'
                                        required
                                        onChange={handleState}
                                        value={preco}
                                    />
                                </div>
            
                                <div className='col-12'>
                                    <button
                                        type='submit'
                                        className='btn btn-success btn-sm'>Atualizar</button>
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

export default EditarServico;