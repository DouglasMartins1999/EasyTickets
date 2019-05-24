import React, { Component } from 'react';
import images from '../../../assets/images/index'
import Header from '../../../components/Purchase/Header';
import Request from '../../../utils/request';
import cpf from '../../../utils/formatCpf';
import date from '../../../utils/date';
import "./styles.css"

class Ticket extends Component {
    constructor(props){
        super(props);

        this.state = {
            ticket: null,
            account: null
        }

        this.getTicket = () => {
            let ticket = new URLSearchParams(props.location.search).get("id")
            if(!ticket) return;
            let req = new Request();
            req.getTicket(ticket)
                .then(ticket => {
                    this.setState({ ticket });
                    console.log(ticket.comprador)
                    return ticket.comprador;
                })
                .then(cod => req.getAccount(cod))
                .then(account => this.setState({ account }));
        }
    }

    componentDidMount(){
        this.getTicket();
    }

    render(){
        const { account, ticket } = this.state;
        return <section>
            <Header isDataEditing={true} fullfill={true}/>
            <main className="purchase-content">
                <div className="page-header">
                    <div className="page-title">
                        <img src={images.checked} alt="Check Icon"/>
                        <h1>Ingresso Adquirido</h1>
                    </div>
                    <button disabled>Imprimir Ingresso</button>
                </div>

                { account ? 
                    <div>
                        <b>Nome: </b> {account.nomeTitular}<br/>
                        <b>CPF: </b> {cpf.toString(account.cpf)}
                    </div>
                : null }
                
                { ticket ?    
                <div>
                    <h1>Informações do Ingresso</h1>
                    <p>
                        <b>Times: </b> {ticket.partida.nomeMandante} x {ticket.partida.nomeVisitante}<br/>
                        <b>Estádio: </b> {ticket.partida.estadio}<br/>
                        <b>Campeonato: </b> {ticket.partida.campeonato}<br/>
                        <b>Data: </b> {date.formatDate(new Date(ticket.partida.data))}
                    </p>
                </div> : null }
            </main>
        </section>;
    }
}

export default Ticket;