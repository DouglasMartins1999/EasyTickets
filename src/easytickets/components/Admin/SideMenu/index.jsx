import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import icons from '../../../assets/images/index';
import Request from '../../../utils/request';
import date from '../../../utils/date';
import "./styles.css"

class SideMenu extends Component {
    constructor(props){
        super(props);

        this.state = {
            nextState: undefined
        }

        this.getNextMatch = () => {
            let date = new Date(), req = new Request(), nextMatch;
            req.getMatches()
                .then(matches => {
                    matches.forEach(match => {
                        console.log(match)
                        if(match.data > date.getTime()){
                            console.log("É dps")
                            if(!nextMatch || nextMatch.data > match.data){
                                console.log('É antes da próxima')
                                nextMatch = match;
                            }
                        }
                    })
                    return nextMatch;
                })
                .then(nextState => this.setState({ nextState }))
        }
    }

    componentDidMount(){
        this.getNextMatch();
    }

    render(){
        const { nextState } = this.state;

        return <aside>
            <img src={icons.logo} className="logo" alt="App Logo"></img>

            <nav className="sidemenu-nav">
                <ul>
                    <li><NavLink to="/"><img src={icons.soccerball}></img> Gerenciar Partidas </NavLink></li>
                    <li><NavLink to="/account"><img src={icons.creditcard}></img> Gerenciar Contas Banc </NavLink></li>
                </ul>
            </nav>

            <section className="next-match">
                <h2>Próxima Partida</h2>

                { nextState ? 
                <div>
                    <div className="players-info">
                        <h1>{nextState.nomeMandante} <span>vs</span> {nextState.nomeVisitante}</h1>
                        <h2>{date.formatDate(new Date(nextState.data))}</h2>
                    </div>

                    <ul>
                        <li><img src={icons.arena}/> Estadio {nextState.estadio}</li>
                        <li><img src={icons.trophy}/> {nextState.campeonato}</li>
                        {/* <li><img src={icons.ticket}/> {nextState.ingressos} ingressos vendidos</li> */}
                    </ul>
                </div>
                : <div className="players-info"><h1>Não há partidas para acontecer</h1></div>}
                
            </section>
        </aside>;
    }
}

export default withRouter(SideMenu);