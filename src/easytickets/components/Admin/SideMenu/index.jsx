import React, { Component } from 'react';
import icons from '../../../assets/images/index';
import "./styles.css"
import date from '../../../utils/date';

class SideMenu extends Component {
    constructor(props){
        super(props);

        this.state = {
            nextState: {
                nomeMandante: "Flamengo",
                nomeVisitante: "Vasco",
                date: new Date(),
                estadio: "da Gávea",
                campeonato: "Taça Rio",
                ingressos: 10
            }
        }
    }
    render(){
        const { nextState } = this.state;
        return <aside>
            <img src={icons.logo} className="logo" alt="App Logo"></img>

            <nav className="sidemenu-nav">
                <ul>
                    <li className="active"><a href="#"><img src={icons.soccerball}></img> Gerenciar Partidas </a></li>
                    <li><a href="#"><img src={icons.creditcard}></img> Gerenciar Contas Banc </a></li>
                </ul>
            </nav>

            <section className="next-match">
                <h2>Próxima Partida</h2>

                <div className="players-info">
                    <h1>{nextState.nomeMandante} <span>vs</span> {nextState.nomeVisitante}</h1>
                    <h2>{date.formatDate(nextState.date)}</h2>
                </div>

                <ul>
                    <li><img src={icons.arena}/> Estadio {nextState.estadio}</li>
                    <li><img src={icons.trophy}/> {nextState.campeonato}</li>
                    <li><img src={icons.ticket}/> {nextState.ingressos} ingressos vendidos</li>
                </ul>
            </section>
        </aside>;
    }
}

export default SideMenu;