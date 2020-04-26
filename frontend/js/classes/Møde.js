class Møde {
    constructor (start, slut, kommentar, kunde, kundeNavn, revisor, tlfnr, email, _id, approved){
        this.startTime = start;
        this.endTime = slut;
        this.kunde = kunde;
        this.kundeNavn = kundeNavn;
        this.revisor = revisor;
        this.kommentar = kommentar;
        this.tlfnr = tlfnr;
        this.email = email;
        this._id = _id;
        this.approved = approved;
    }

    //Returnerer differencen mellem start- og slut i timer
    getMødeLængde(){
        return (this.endTime.getTime() - this.startTime.getTime()) / (1000 * 60 * 60);
    }

    getStartTid() {
        return this.startTime;
    }
    getSlutTid() {
        return this.endTime;
    }

    getKundenavn() {
        return this.kundeNavn;
    }
    getRevisornavn() {
        return this.revisor.navn;
    }
    getKommentar() {
        return this.kommentar;
    }
    getTlfnr() {
        return this.tlfnr;
    }
    getEmail() {
        return this.email;
    }
    getID() {
        return this._id;
    }
    getStatus() {
        return this.approved;
    }
}