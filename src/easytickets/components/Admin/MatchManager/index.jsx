import React, { Component } from 'react';
import "./styles.css";

class MatchManager extends Component {
    constructor(props){
        super(props);

        this.defaultOptions = { 
            isInsertion: true,
            originalData: {
                id: 1
            }
        }
    }

    render(){
        const { options = this.defaultOptions } = this.props;
        return <article>
            <h1 className="modal-title">{ options.isInsertion ? "Inserir" : "Atualizar" } Partida</h1>

            <form name="matchmanager" id="formmanager">
                <div>
                    <label for="campeonato">Campeonato</label><br/>
                    <select id="campeonato" name="campeonato">
                        <option value="Brasileirão">Brasileirão</option>
                        <option value="Libertadores">Libertadores</option>
                        <option value="Copa do Brasil">Copa do Brasil</option>
                        <option value="Estadual">Estadual</option>
                    </select>
                </div>

                <div>
                    <label for="estadio">Estadio</label><br/>
                    <input type="text" name="estadio" id="estadio" list="estadios"/>
                    <datalist id="estadios">
                        <option value="Itaquera"/>
                        <option value="Allianz Parque"/>
                        <option value="Morumbi"/>
                        <option value="Vila Belmiro"/>
                        <option value="Maracanã"/>
                        <option value="Pacaembu"/>
                    </datalist>
                </div>

                <div>
                    <label for="datetime">Data</label><br/>
                    <input type="datetime-local" name="datetime" id="datetime" />
                </div>

                <div>
                    <label for="peso">Peso</label><br/>
                    <input type="number" name="peso" id="peso" min="1" max="5" step="0.1" />
                </div>

                <div>
                    <label for="mandante">Mandante</label><br/>
                    <input type="text" name="mandante" id="mandante" />
                </div>

                <div>
                    <label for="placarmandante">Placar Mandante</label><br/>
                    <input type="number" name="placarmandante" id="placarmandante" min="0"/>
                </div>

                <div>
                    <label for="placarvisitante">Placar Visitante</label><br/>
                    <input type="number" name="placarvisitante" id="placarvisitante" min="0" />
                </div>

                <div>
                    <label for="visitante">Visitante</label><br/>
                    <input type="text" name="visitante" id="visitante" />
                </div>
            </form>
            <button form="formmanager">Salvar Dados</button>
        </article>;
    }
}

export default MatchManager;