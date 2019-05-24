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
}

module.exports = Request;