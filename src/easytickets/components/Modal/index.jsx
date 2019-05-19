import React, { Component } from 'react';
import "./styles.css"

class Modal extends Component {
    stopPropagation(e){
        e.stopPropagation();
    }

    render(){
        const { isOpen, content, onClose } = this.props;
        return (isOpen ? 
        <div className="modal-overlay" onClick={onClose}>
            <section className="modal-content" onClick={this.stopPropagation}>
                { content }
            </section>
        </div> : null);
    }
}

export default Modal;
