import React, { Component } from 'react';
import Header from '../../../components/Purchase/Header';
import "./styles.css"
import images from '../../../assets/images';
import MatchCard from '../../../components/Purchase/MatchCard';
import Modal from '../../../components/Modal';
import TicketForm from '../../../components/Purchase/TicketForm';

class OrderPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            matches: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            isModalVisible: false,
            currentModal: null
        }

        this.toggleModal = (modal) => {
            const { isModalVisible } = this.state;
            this.setState({ isModalVisible: !isModalVisible, currentModal: modal })
        }
    }
    render(){
        const { matches, isModalVisible, currentModal } = this.state;
        return <section>
            <Header />
            <main className="purchase-content">
                <div className="page-header">
                    <div className="page-title">
                        <img src={images.soccer} alt="Shopcart Icon"/>
                        <h1>Próximas Partidas</h1>
                    </div>
                    <button>Comprar Ingresso</button>
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