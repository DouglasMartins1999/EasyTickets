class Date {
    constructor(){}
    formatDate(date = new Date(), isSeparated = false){
        if(isSeparated){
            return {
                fulldate: `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`,
                date: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear(),
                time: `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}}`
            }
        } else {
            return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
        }
    }
}

export default new Date();