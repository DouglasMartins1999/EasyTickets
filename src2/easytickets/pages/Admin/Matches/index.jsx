import React, { Component } from "react";
import images from "../../../assets/images/index";
import SideMenu from "../../../components/Admin/SideMenu";
import Request from "../../../utils/request";
import MatchForm from "../../../components/Admin/MatchForm";
import Modal from "../../../components/Modal";
import date from "../../../utils/date";
import "../styles.css";

class MatchesPage extends Component {
  constructor(props) {
    super(props);

    this.tableLayout = [
      "ID",
      "Mandante vs Visitante",
      "Placar",
      "Data e Hora",
      "Estádio",
      "Campeonato",
      "Peso",
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

    this.updateList = () => {
      const req = new Request();
      req.getMatches().then(data => this.setState({ data }));
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

    this.insertMatch = () => {
      const modal = (
        <MatchForm
          onClose={this.toggleModal}
          modifyData={this.modifyStateData}
        />
      );
      this.toggleModal(modal);
    };

    this.updateMatch = match => {
      const modal = (
        <MatchForm
          onClose={this.toggleModal}
          modifyData={this.modifyStateData}
          isUpdate={true}
          originalData={match}
        />
      );
      this.toggleModal(modal);
    };

    this.deleteMatch = match => {
      const confirm = window.confirm(
        "Tem certeza que deseja deletar essa partida? Essa ação é irreversível"
      );
      if (confirm) {
        new Request().deleteMatch(match).then(data => {
          if (data > 0) {
            this.updateList();
            window.alert("Partida removida com sucesso");
          } else {
            window.alert("Erro ao remover a partida. 0 linhas alteradas");
          }
        });
      }
    };
  }

  componentDidMount() {
    this.updateList();
  }

  render() {
    const { data: matches, isModalOpen, currentModal } = this.state;
    return (
      <div className="page-content">
        <SideMenu />
        <main>
          <header className="content-header">
            <div>
              <h1 className="title">Gerenciar Jogos</h1>
              <span>
                Visualizar, Inserir, Atualizar e Remover jogos para compra de
                ingressos
              </span>
            </div>
            <button onClick={this.insertMatch}>Inserir Partida</button>
          </header>

          <section className="content-data">
            <table>
              <thead>
                <tr>
                  {this.tableLayout.map(item => (
                    <th key={"th" + item}>{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matches.map(match => {
                  return (
                    <tr>
                      <td>{match.cod}</td>
                      <td>
                        {match.nomeMandante} x {match.nomeVisitante}
                      </td>
                      <td>
                        {typeof match.placarMandante === "number"
                          ? match.placarMandante
                          : "--"}{" "}
                        x{" "}
                        {typeof match.placarVisitante === "number"
                          ? match.placarVisitante
                          : "--"}
                      </td>
                      <td>{date.formatDate(new Date(match.data))}</td>
                      <td>{match.estadio}</td>
                      <td>{match.campeonato}</td>
                      <td>{match.peso}</td>
                      <td>
                        <div className="actions">
                          <img
                            src={images.edit}
                            alt="Editar Partida"
                            onClick={() => this.updateMatch(match)}
                          />
                          <img
                            src={images.delete}
                            alt="Deletar Partida"
                            onClick={() => this.deleteMatch(match.cod)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
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

export default MatchesPage;
