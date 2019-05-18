import React, { Component } from 'react';
import "./styles.css"
import MatchManager from '../Admin/MatchManager';

class Modal extends Component {
    constructor(props){
        super(props);

        this.state = {
            isOpen: true,
            currentModal: null,
            options: {}
        }

        this.toggleModal = e => {
            const { isOpen } = this.state;
            this.setState({ isOpen: !isOpen });
        }

        this.stopPropagation = e => {
            e.stopPropagation();
        }
    }

    render(){
        const { isOpen, currentModal, options } = this.state;
        return (isOpen ? 
        <div className="modal-overlay" onClick={this.toggleModal}>
            <section className="modal-content" onClick={this.stopPropagation}>
                { currentModal }
                <MatchManager />
            </section>
        </div> : null);
    }
}

export default Modal;