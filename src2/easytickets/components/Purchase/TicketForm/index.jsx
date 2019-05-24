import React, { Component } from 'react';
import date from '../../../utils/date';
import formatCurrency from '../../../utils/formatCurrency';
import './styles.css'

class TicketForm extends Component {
    constructor(props){
        super(props);

        this.state = {}

        this.calcPrice = (weight = props.match.peso) => {
            let basePrice = 35.0, multiplier = 0, seat = Number(props.seat);
            if(seat <= 0 || seat > 40) return null;

            if(seat > 32 || seat < 8){
                multiplier = 1.0;
            } else if(seat > 24 || seat < 16){
                multiplier = 1.5;
            } else {
                multiplier = 2.0;
            }

            return basePrice * weight * multiplier;
        }
    }
    render(){
        const { campeonato, estadio, nomeMandante, nomeVisitante, data } = this.props.match;
        const { seat } = this.props
        return <article className="ticket-form">
            <div className="modal-content">
                <h1 className="title-details">Comprar Ingresso</h1>

                <div className="teams-info">
                    <h2>{nomeMandante}</h2>
                    <span>vs</span>
                    <h2>{nomeVisitante}</h2>
                </div>

                <h1 className="price">{formatCurrency(this.calcPrice())}</h1>

                <section className="ticket-details">
                    <div>
                        <h3>Disputando</h3>
                        <p>Campeonato {campeonato}</p>  
                    </div>

                    <div>
                        <h3>Quando?</h3>
                        <p>{date.formatDate(new Date(data))}h</p>
                    </div>

                    <div>
                        <h3>Onde?</h3>
                        <p>Estádio {estadio}</p>
                    </div>

                    <div>
                        <h3>Assento Escolhido</h3>
                        <p>{seat}</p>
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