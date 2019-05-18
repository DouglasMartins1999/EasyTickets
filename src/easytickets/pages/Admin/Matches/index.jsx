import React, { Component } from 'react';
import icons from '../../../assets/images/index';
import "../styles.css"
import SideMenu from '../../../components/Admin/SideMenu';

class MatchesPage extends Component {
    constructor(props){
        super(props);

        this.state = {
        }
        this.tableLayout = ["ID", "Mandante vs Visitante", "Placar", "Data e Hora", "Estádio", "Campeonato", "Peso", "Ações"]

    }
    render(){
        return <div class="page-content">
            <SideMenu />
            <main>
                <header class="content-header">
                    <div>
                        <h1>Gerenciar Jogos</h1>
                        <span>Visualizar, Inserir, Atualizar e Remover jogos para compra de ingressos</span>
                    </div>
                    <button>Inserir Partida</button>
                </header>

                <section class="content-data">
                    <table>
                        <tr>
                            {this.tableLayout.map(item => <th key={"th" + item}>{item}</th>)}
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Corinthians x Palmeiras</td>
                            <td>1 x 0</td>
                            <td>12/05/2019 16:00</td>
                            <td>Itaquera</td>
                            <td>Copa do Brasil</td>
                            <td>4.5</td>
                            <td>
                                <div className="actions">
                                    <img src={icons.edit}/>
                                    <img src={icons.delete}/>
                                </div>
                            </td>
                        </tr>
                    </table>
                </section>
            </main>
        </div>;
    }
}

export default MatchesPage;