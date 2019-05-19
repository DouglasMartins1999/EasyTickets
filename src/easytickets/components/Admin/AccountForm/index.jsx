import React, { Component } from "react";

import images from "../../../assets/images";

class AccountForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };

    this.handleSubmit = () => {};
  }

  render() {
    const { isUpdate } = this.props;

    return (
      <article>
        <h1 className="modal-title">
          {isUpdate ? "Atualizar" : "Inserir"} Conta Bancária
        </h1>
        <form ref={ref => (this.form = ref)} id="formmanager">
          <div>
            <label htmlFor="estadio">Agência</label>
            <br />
            <input
              type="text"
              name="agencia"
              id="agencia"
              defaultValue={""}
              required={true}
            />
          </div>

          <div>
            <label htmlFor="peso">Nome do Titular</label>
            <br />
            <input
              type="text"
              name="titular"
              id="titular"
              defaultValue={""}
              required={true}
            />
          </div>

          <div>
            <label htmlFor="cpf">CPF</label>
            <br />
            <input
              type="text"
              name="cpf"
              id="cpf"
              defaultValue={""}
              required="true"
            />
          </div>

          <div>
            <label htmlFor="placarMandante">Saldo</label>
            <br />
            <input
              type="text"
              name="saldo"
              id="saldo"
              min="0"
              defaultValue={""}
            />
          </div>

          <div>
            <label htmlFor="senha">Senha</label>
            <br />
            <input type="password" name="password" id="password" />
          </div>
        </form>
        <div className="submit-data">
          <button form="formmanager" onClick={this.handleSubmit}>
            Salvar Dados
          </button>
          {this.state.isLoading ? (
            <img src={images.loading} alt="Carregando" className="loading" />
          ) : null}
        </div>
      </article>
    );
  }
}

export default AccountForm;
