import React, { Component } from 'react';
import './styles.css'
import TicketForm from '../TicketForm';
import date from '../../../utils/date';
import Request from '../../../utils/request';

class MatchCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            isPickerVisible: false,
            seatAmount: 40,
            seatsUnavaiable: []
        }

        this.changeCard = () => {
            const { isPickerVisible } = this.state;
            this.card.classList.add("rotate");
            setTimeout(() => {
                this.setState({ isPickerVisible: !isPickerVisible })
                this.card.classList.remove("rotate");
            }, 270)
        }

        this.loadTickets = () => {
            new Request().getSeats(props.match.cod)
                .then(seats => this.setState({ seatsUnavaiable: seats }));

        }

        this.purchaseTicket = (e, seat) => {
            this.preventBubbling(e);
            props.modal(<TicketForm matchInfo={props.match} seat={seat} modal={props.modal}/>);
        }

        this.preventBubbling = (e) => {
            e.stopPropagation();
        }
    }

    componentDidMount(){
        this.loadTickets();
    }

    render(){
        const { isPickerVisible, seatAmount, seatsUnavaiable } = this.state;
        const seats = new Array(seatAmount).fill("");
        const { campeonato, estadio, data, nomeMandante, nomeVisitante } = this.props.match;

        return <div className="card" ref={ref => this.card = ref} onClick={this.changeCard}>
            { !isPickerVisible ? <div>
            <div className="match-info">
                <span>Campeonato: {campeonato}</span>
                <div className="teams-info">
                    <h2>{nomeMandante}</h2>
                    <span>vs</span>
                    <h2>{nomeVisitante}</h2>
                </div>
                <span>{estadio} - {date.formatDate(new Date(data))}</span>
            </div>
            <div className="ticket-info">
                <span>{seatAmount - seatsUnavaiable.length} ingressos restantes</span>
                <a>Adquirir Agora</a>
            </div></div> :
            <div className="match-info">
                <span>Escolha um assento</span>
                <div className="sit-picker">
                    {seats.map((sit, i) => <button className={"sit-number" + (seatsUnavaiable.includes(i + 1) ? " inactive" : "")} onClick={(e) => !seatsUnavaiable.includes(i + 1) ? this.purchaseTicket(e, i + 1) : this.preventBubbling(e)}>{i + 1}</button>)}
                </div>
            </div>}
        </div>;
    }
}

export default MatchCard;