import React, { Component } from 'react';
import Header from '../../../components/Purchase/Header';
import "./styles.css"
import images from '../../../assets/images';
import MatchCard from '../../../components/Purchase/MatchCard';
import Modal from '../../../components/Modal';
import TicketForm from '../../../components/Purchase/TicketForm';
import Request from '../../../utils/request';

class OrderPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            matches: [],
            isModalVisible: false,
            currentModal: null
        }

        this.toggleModal = (modal) => {
            const { isModalVisible } = this.state;
            this.setState({ isModalVisible: !isModalVisible, currentModal: modal })
        }

        this.loadMatches = () => {
            const date = new Date().getTime();
            new Request().getMatches()
                .then(matches => matches.filter(match => match.data >= date))
                .then(matches => this.setState({ matches }))
        }
    }

    componentDidMount(){
        this.loadMatches();
    }

    render(){
        const { matches, isModalVisible, currentModal } = this.state;
        return <section>
            <Header isDataEditing={isModalVisible}/>
            <main className="purchase-content">
                <div className="page-header">
                    <div className="page-title">
                        <img src={images.soccer} alt="Shopcart Icon"/>
                        <h1>Próximas Partidas</h1>
                    </div>
                    <button onClick={this.loadMatches}>Atualizar Lista</button>
                </div>

                <article className="matches-wrapper">
                    { matches.map(match => <MatchCard match={match} modal={this.toggleModal}/>) }
                </article>
            </main>
            <Modal isOpen={isModalVisible} content={currentModal} onClose={this.toggleModal}/>
        </section>;
    }
}

export default OrderPage;