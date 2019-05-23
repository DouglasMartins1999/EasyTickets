import React, { Component } from 'react';
import "./styles.css"
import images from '../../../assets/images';

class Header extends Component {
    render(){
        const { isDataEditing, fullfill } =this.props;
        return <header className="purchase-header">
            <div className="page-info">
                <img src={images.logo} />
                <hr />
                <h1>Adquirir Ingresso</h1>
            </div>

            <div className="process-steps">
                <a className="purchase-step">
                    <img src={images.processStep} />
                    <span>Selecionar Partida</span>
                </a>

                <a className={"purchase-step" + (!isDataEditing ? " inactive" : "")}>
                    <img src={images.processStep} />
                    <span>Inserir Dados</span>
                </a>

                <a className={"purchase-step" + (!fullfill ? " inactive" : "")}>
                    <img src={images.processStep} />
                    <span>Concluído</span>
                </a>
            </div>
        </header>;
    }
}

export default Header;