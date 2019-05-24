import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import date from '../../../utils/date';
import formatCurrency from '../../../utils/formatCurrency';
import formatCpf from '../../../utils/formatCpf';
import Request from '../../../utils/request';
import './styles.css'

class TicketForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            accounts: []
        }

        this.calcPrice = (weight = props.matchInfo.peso) => {
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

        this.getAccounts = (e) => {
            e.preventDefault();
            const { value : CPF } = this.CPFForm;
            let CPFvalue = formatCpf.toNumber(CPF);

            new Request().getAccountsByCpf(CPFvalue)
                .then(list => this.setState({ accounts: list }))
        }

        this.generateTicket = (e) => {
            e.preventDefault();
            const { value : account } = this.account;
            const { value : pswd } = this.pswd;
            const { seat } = props;
            const req = new Request();

            req.processTransaction(account, this.calcPrice(), Number(pswd))
                .then(resp => {
                    if(resp === "-1"){
                        alert("Lamento, seu saldo nessa conta é insuficiente para adquirir esse ingresso");
                    } else if(resp === "0"){
                        alert("Não conseguimos processar sua operação. Verifique sua senha e tente novamente");
                    } else {
                        req.generateTicket(props.matchInfo.cod, seat, account)
                            .then(ticket => {
                                alert("Ingresso Emitido com Sucesso")
                                props.modal(null);
                                props.history.push(`/ticket?id=${ticket.cod}`)
                            })
                    }
                })
        }
    }
    render(){
        const { campeonato, estadio, nomeMandante, nomeVisitante, data } = this.props.matchInfo;
        const { seat } = this.props;
        const { accounts } = this.state;

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
                    <input type="text" name="cpf" ref={(ref) => this.CPFForm = ref}/>
                    <button className="wide-button" onClick={this.getAccounts}>Buscar Contas</button>

                    <hr />

                    <h3>Conta Bancária</h3>
                    <select disabled={!accounts.length} ref={(ref) => this.account = ref}>
                        {accounts.map(account => <option value={account.cod}>Ag. {account.agencia} - Cc. {account.cod}</option>)}
                    </select>

                    <h3>Senha</h3>
                    <input type="password" name="senha" disabled={!accounts.length} ref={(ref) => this.pswd = ref}/>

                    <div className="form-actions">
                        <button onClick={this.props.modal} className="secondary-btn">Cancelar</button>
                        <button onClick={this.generateTicket}>Comprar Ingresso</button>
                    </div>
                </form>
            </div>
        </article>;
    }
}

export default withRouter(TicketForm);