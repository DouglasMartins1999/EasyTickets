import React, { Component } from 'react';
import './styles.css'

class TicketForm extends Component {
    render(){
        return <article className="ticket-form">
            <div className="modal-content">
                <h1 className="title-details">Comprar Ingresso</h1>

                <div className="teams-info">
                    <h2>Flamengo</h2>
                    <span>vs</span>
                    <h2>Chapecoense</h2>
                </div>

                <h1 className="price">R$452,00</h1>

                <section className="ticket-details">
                    <div>
                        <h3>Disputando</h3>
                        <p>Campeonato Brasileirão</p>  
                    </div>

                    <div>
                        <h3>Quando?</h3>
                        <p>12/06/2019 16:00h</p>
                    </div>

                    <div>
                        <h3>Onde?</h3>
                        <p>Estádio Maracanã</p>
                    </div>

                    <div>
                        <h3>Assento Escolhido</h3>
                        <p>32</p>
                    </div>
                </section>
            </div>
            <div className="purchase-info">
                <h1>Finalizar Compra</h1>

                <form id="ordermanager">
                    <h3>CPF</h3>
                    <input type="text" name="cpf"/>
                    <button className="wide-button">Buscar Contas</button>

                    <hr />

                    <h3>Conta Bancária</h3>
                    <select disabled>
                    </select>

                    <h3>Senha</h3>
                    <input type="password" name="senha" disabled={true}/>

                    <div className="form-actions">
                        <button className="secondary-btn">Cancelar</button>
                        <button>Comprar Ingresso</button>
                    </div>
                </form>
            </div>
        </article>;
    }
}

export default TicketForm;