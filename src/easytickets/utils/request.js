class Request {
    getMatches(){
        return fetch("/partidas")
            .then(resp => resp.json())
    }

    postMatch(data){
        return fetch("/partidas", {
            method: "POST",
            body: data,
            headers: { 'Content-Type': 'application/json' }
        }).then(resp => resp.json())
    }

    putMatch(cod, data){
        return fetch(`/partidas/${cod}`, {
            method: "PUT",
            body: data,
            headers: { 'Content-Type': 'application/json' }
        }).then(resp => resp.text());
    }

    deleteMatch(cod = -1){
        return fetch(`/partidas/${cod}`, {
            method: "DELETE"
        }).then(resp => resp.text());
    }

    getSeats(cod = -1){
        return fetch(`/ingressos/?partida=${cod}&onlyseats=true`)
            .then(resp => resp.json());
    }

    getAccounts(cpf = 0){
        return fetch(`/contas/cliente/${cpf}`)
            .then(resp => resp.json());
    }

    processTransaction(account = "0", value = 0, pswd = ""){
        return fetch(`/contas/${account}/saldo`, {
            method: 'PUT',
            body: JSON.stringify({ transacao: value, senha: pswd }),
            headers: { 'Content-Type': 'application/json' }
        }).then(resp => resp.text())
    }

    generateTicket(matchID = 0, seat = 0, owner = 0){
        return fetch(`/ingressos`, {
            method: "POST",
            body: JSON.stringify({ partida: matchID, assento: seat, comprador: owner }),
            headers: { 'Content-Type': 'application/json' }
        }).then(resp => resp.json())
    }
}

module.exports = Request;