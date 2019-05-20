import React, { Component } from 'react';
import './styles.css'
import TicketForm from '../TicketForm';

class MatchCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            isPickerVisible: false,
            seatAmount: 40
        }

        this.changeCard = () => {
            const { isPickerVisible } = this.state;
            this.card.classList.add("rotate");
            setTimeout(() => {
                this.setState({ isPickerVisible: !isPickerVisible })
                this.card.classList.remove("rotate");
            }, 270)
        }

        this.purchaseTicket = (e) => {
            this.preventBubbling(e);
        }

        this.preventBubbling = (e) => {
            e.stopPropagation();
            props.modal(<TicketForm/>);
        }
    }
    render(){
        const { isPickerVisible, seatAmount } = this.state;
        const seats = new Array(seatAmount).fill("");
        return <div className="card" ref={ref => this.card = ref} onClick={this.changeCard}>
            { !isPickerVisible ? <div>
            <div className="match-info">
                <span>Campeonato: Brasileirão</span>
                <div className="teams-info">
                    <h2>Chapecoense</h2>
                    <span>vs</span>
                    <h2>Corinthians</h2>
                </div>
                <span>Arena Condá - 12/06/2019 16:00</span>
            </div>
            <div className="ticket-info">
                <span>10 ingressos restantes</span>
                <a>Adquirir Agora</a>
            </div></div> :
            <div className="match-info">
                <span>Escolha um assento</span>
                <div className="sit-picker">
                    {seats.map((sit, i) => <button className="sit-number" onClick={this.purchaseTicket}>{i + 1}</button>)}
                </div>
            </div>}
        </div>;
    }
}

export default MatchCard;