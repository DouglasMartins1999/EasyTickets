import React, { Component } from "react";
import icons from "../../../assets/images/index";
import "../styles.css";

import formatCurrency from "../../../utils/formatCurrency";
import formatCpf from "../../../utils/formatCpf";

import SideMenu from "../../../components/Admin/SideMenu";
import Modal from "../../../components/Modal";
import AccountForm from "../../../components/Admin/AccountForm";

class AccountsPage extends Component {
  constructor(props) {
    super(props);

    this.tableLayout = [
      "ID",
      "Agência",
      "Nome Titular",
      "CPF",
      "Saldo",
      "Ações"
    ];
    this.state = {
      isModalOpen: false,
      currentModal: null,
      data: []
    };

    this.toggleModal = modal => {
      const { isModalOpen } = this.state;
      this.setState({ isModalOpen: !isModalOpen, currentModal: modal });
    };

    this.insertMatch = () => {
      const modal = (
        <AccountForm
          onClose={this.toggleModal}
          modifyData={this.modifyStateData}
        />
      );
      this.toggleModal(modal);
    };

    this.updateMatch = match => {
      const modal = (
        <AccountForm
          onClose={this.toggleModal}
          modifyData={this.modifyStateData}
          isUpdate={true}
          originalData={match}
        />
      );
      this.toggleModal(modal);
    };

    this.modifyStateData = obj => {
      const { data } = this.state;
      const match = data.findIndex(match => match.cod === obj.cod);
      if (match !== -1) {
        data[match] = obj;
      } else {
        data.push(obj);
      }
      this.setState({ data });
    };
  }

  render() {
    const { visibleModal, isModalOpen, currentModal } = this.state;

    return (
      <div class="page-content">
        <SideMenu />
        <main>
          <header class="content-header">
            <div>
              <h1 className="title">Gerenciar Contas</h1>
              <span>
                Visualizar, Inserir, Atualizar e Remover Contas Bancárias
              </span>
            </div>
            <button onClick={this.insertMatch}>
              Inserir Conta Bancária
            </button>
          </header>
          <section class="content-data">
            <table>
              <tr>
                {this.tableLayout.map(item => (
                  <th key={"th" + item}>{item}</th>
                ))}
              </tr>
              <tr>
                <td>1</td>
                <td>Bradesco</td>
                <td>João Alves da Silva</td>
                <td>{formatCpf.toString(72141266050)}</td>
                <td>{formatCurrency(800)}</td>
                <td>
                  <div className="actions">
                    <img src={icons.edit} />
                    <img src={icons.delete} />
                  </div>
                </td>
              </tr>
            </table>
          </section>
        </main>
        <Modal
          isOpen={isModalOpen}
          onClose={this.toggleModal}
          content={currentModal}
        />
      </div>
    );
  }
}

export default AccountsPage;
