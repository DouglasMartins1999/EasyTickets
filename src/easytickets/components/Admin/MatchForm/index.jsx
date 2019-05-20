import React, { Component } from 'react';
import Request from '../../../utils/request'
import images from '../../../assets/images';
import "./styles.css";

class MatchForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false
        }

        this.submitData = (e) => {
            let { isUpdate, originalData: d } = props;
            let formdata = new FormData(this.form), obj = {}, req = new Request();

            e.preventDefault();
            this.setState({ isLoading: true })
            formdata.forEach((data, key) => obj[key] = data)
            obj.data = new Date(obj.data || "01/01/2019 00:00").getTime();
            obj.placarMandante = Number(obj.placarMandante);
            obj.placarVisitante = Number(obj.placarVisitante);
            
            if(isUpdate){
                req.putMatch(d.cod, JSON.stringify(obj))
                    .then(data => {
                        if(+data > 0){
                            alert("Partida Atualizada");
                            obj.cod = d.cod;
                            this.props.modifyData(obj);
                            this.props.onClose();
                        }
                    });
            } else {
                req.postMatch(JSON.stringify(obj))
                    .then(data => {
                        if(data){
                            alert("Partida Inserida")
                            this.props.modifyData(data);
                            this.props.onClose();
                        }
                    });
            }
        }
    }


    render(){
        const { isUpdate, originalData } = this.props;
        return <article className="modal-content">
            <h1 className="modal-title">{ isUpdate ? "Atualizar" : "Inserir" } Partida</h1>
            <form ref={ref => this.form = ref} id="formmanager">
                <div>
                    <label htmlFor="campeonato">Campeonato</label><br/>
                    <select id="campeonato" name="campeonato" defaultValue={originalData ? originalData.campeonato : ""}>
                        <option value="Brasileirão">Brasileirão</option>
                        <option value="Libertadores">Libertadores</option>
                        <option value="Copa do Brasil">Copa do Brasil</option>
                        <option value="Estadual">Estadual</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="estadio">Estadio</label><br/>
                    <input type="text" name="estadio" id="estadio" list="estadios" defaultValue={originalData ? originalData.estadio : ""} required={true}/>
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
                    <label htmlFor="datetime">Data</label><br/>
                    <input type="datetime-local" name="data" id="datetime" defaultValue={new Date(originalData ? originalData.data : new Date()).toISOString().slice(0,16)} required={true}/>
                </div>

                <div>
                    <label htmlFor="peso">Peso</label><br/>
                    <input type="number" name="peso" id="peso" min="1" max="5" step="0.1" defaultValue={originalData ? originalData.peso : ""} required={true}/>
                </div>

                <div>
                    <label htmlFor="mandante">Mandante</label><br/>
                    <input type="text" name="nomeMandante" id="mandante" defaultValue={originalData ? originalData.nomeMandante : ""} required="true"/>
                </div>

                <div>
                    <label htmlFor="placarMandante">Placar Mandante</label><br/>
                    <input type="number" name="placarMandante" id="placarMandante" min="0" defaultValue={originalData ? originalData.placarMandante : ""}/>
                </div>

                <div>
                    <label htmlFor="placarvisitante">Placar Visitante</label><br/>
                    <input type="number" name="placarVisitante" id="placarVisitante" min="0" defaultValue={originalData ? originalData.placarVisitante : ""}/>
                </div>

                <div>
                    <label htmlFor="visitante">Visitante</label><br/>
                    <input type="text" name="nomeVisitante" id="visitante" defaultValue={originalData ? originalData.nomeVisitante : ""} required={true}/>
                </div>
            </form>
            <div className="submit-data">
                <button form="formmanager" onClick={this.submitData}>Salvar Dados</button>
                { this.state.isLoading ? <img src={images.loading} alt="Carregando" className="loading"/> : null }
            </div>
        </article>;
    }
}

export default MatchForm;