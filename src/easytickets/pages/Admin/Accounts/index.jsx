import React, { Component } from "react";
import icons from "../../../assets/images/index";
import Request from "../../../utils/request";

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

    this.listAccounts = () => {
      const req = new Request();
      req.getAccounts().then(data => this.setState({ data }));
    };

    this.modifyStateData = obj => {
      const { data } = this.state;
      const account = data.findIndex(account => account.cod === obj.cod);

      if (account !== -1) {
        data[account] = obj;
      } else {
        data.push(obj);
      }
      this.setState({ data });
    };

    this.insertAccount = () => {
      const modal = (
        <AccountForm
          onClose={this.toggleModal}
          modifyData={this.listAccounts}
        />
      );
      this.toggleModal(modal);
    };

    this.updateAccount = account => {
      const modal = (
        <AccountForm
          onClose={this.toggleModal}
          modifyData={this.modifyStateData}
          isUpdate={true}
          originalData={account}
        />
      );
      this.toggleModal(modal);
    };

    this.deleteAccount = account => {
      const confirm = window.confirm(
        "Tem certeza que deseja deletar essa conta? Esta opção é irreversível"
      );
      if (confirm) {
        new Request().deleteAccount(account).then(data => {
          if (data > 0) {
            this.listAccounts();
            window.alert("Conta removida com sucesso");
          } else {
            window.alert("Erro ao remover a conta. 0 linhas alteradas");
          }
        });
      }
    };
  }

  componentDidMount() {
    this.listAccounts();
  }

  render() {
    const {
      data: accounts,
      visibleModal,
      isModalOpen,
      currentModal
    } = this.state;

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
            <button onClick={this.insertAccount}>Inserir Conta Bancária</button>
          </header>
          <section class="content-data">
            <table>
              <thead>
                <tr>
                  {this.tableLayout.map(item => (
                    <th key={"th" + item}>{item}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {accounts.length > 0 ? accounts.map(account => {
                  return (
                    <tr>
                      <td>{account.cod}</td>
                      <td>{account.agencia}</td>
                      <td>{account.nomeTitular}</td>
                      <td>{formatCpf.toString(account.cpf)}</td>
                      <td>{formatCurrency(800)}</td>
                      <td>
                        <div className="actions">
                          <img
                            src={icons.edit}
                            alt="Editar Conta"
                            onClick={() => this.updateAccount(account)}
                          />
                          <img
                            src={icons.delete}
                            alt="Deletar conta"
                            onClick={() => this.deleteAccount(account.cod)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                }): ""}
              </tbody>
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
