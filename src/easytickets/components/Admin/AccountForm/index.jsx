import React, { Component } from "react";
import Request from "../../../utils/request";

import CPF from "../../../utils/formatCpf";

import images from "../../../assets/images";

class AccountForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };

    this.handleSubmit = e => {
      let { isUpdate, originalData: d } = props;
      let formdata = new FormData(this.form),
        obj = {},
        req = new Request();

      e.preventDefault();
      this.setState({ isLoading: true });
      formdata.forEach((data, key) => (obj[key] = data));
      obj.cpf = CPF.toNumber(obj.cpf);
      console.log(obj);
      obj.agencia = Number(obj.agencia);
      obj.senha = parseInt(obj.senha);
      obj.saldo = parseFloat(obj.saldo);

      if (isUpdate) {
        req.editAccount(d.cod, JSON.stringify(obj)).then(data => {
          if (+data > 0) {
            alert("Conta Atualizada");
            obj.cod = d.cod;
            this.props.modifyData();
            this.props.onClose();
          }
        });
      } else {
        req.postAccount(JSON.stringify(obj)).then(data => {

          alert("Conta Inserida");
          this.props.onClose();
          this.props.modifyData();
        });
      }
    };
  }

  render() {
    const { isUpdate, originalData } = this.props;

    return (
      <article className="modal-content">
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
              defaultValue={originalData ? originalData.agencia : ""}
              required={true}
            />
          </div>

          <div>
            <label htmlFor="peso">Nome do Titular</label>
            <br />
            <input
              type="text"
              name="nomeTitular"
              id="titular"
              defaultValue={originalData ? originalData.nomeTitular : ""}
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
              defaultValue={originalData ? originalData.cpf : ""}
              required="true"
            />
          </div>

          <div>
            <label htmlFor="saldo">Saldo</label>
            <br />
            <input
              type="number"
              name="saldo"
              id="saldo"
              min="0"
              defaultValue={originalData ? originalData.saldo : ""}
            />
          </div>

          <div>
            <label htmlFor="senha">Senha</label>
            <br />
            <input type="password" name="senha" id="senha" />
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
