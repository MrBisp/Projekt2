// Lavet af VR
// starter med at definere Møde class constructor: Møde består af
// https://eloquentjavascript.net/Eloquent_JavaScript.pdf p.102

class Møde {
    constructor (start, slut, kommentar, kunde, kundeNavn, revisor, tlfnr, mail, id, approved){
        this.startTime = start;
        this.endTime = slut;
        this.kunde = kunde;
        this.kundeNavn = kundeNavn;
        this.revisor = revisor;
        this.kommentar = kommentar;
        this.tlfnr = tlfnr;
        this.mail = mail;
        this.id = id;
        this.approved = approved;
    }

    printTime(){
        console.log(' Mødet starter: ' + this.startTime + ' og slutter: ' + this.endTime);
    }
// getTime
// https://eloquentjavascript.net/Eloquent_JavaScript.pdf p.149
    getMødeLængde(){
        return (this.endTime.getTime() - this.startTime.getTime()) / (1000 * 60 * 60);
    }


    printMødeLængde(){
        //kilde: https://stackoverflow.com/questions/13894632/get-time-difference-between-two-dates-in-seconds

        //getTime() afleverer tiden i millisekunder. Derfor må vi gange med 1000
        //1000 (ms) * 60 (sekunder) * 60 (minutter) for at få tiden i timer
        var differenceInHours = (this.endTime.getTime() - this.startTime.getTime()) / (1000 * 60 * 60);
        console.log('Mødet varer: ' + differenceInHours + ' timer');
    }

    //Inspiration: https://stackoverflow.com/a/11796776
    changeMeeting(args) {

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

    getMail() {
        return this.mail;

    }

    getID() {
        return this.id;
    }

    getStatus() {
        return this.approved;
    }
}
// inheritance
// super()
// https://eloquentjavascript.net/Eloquent_JavaScript.pdf p.112

class langMøde extends Møde {
    constructor(start, kommentar, kundenavn, tlfnr, mail) {
        //langMøde varer 1 time

        var slut = new Date(start.getTime() + 60 * 60 * 1000);
        super(start, slut, kommentar, kundenavn, tlfnr, mail);
    }
}

class kortMøde extends Møde {
    constructor(start, kommentar, kundenavn, tlfnr, mail) {
        //kort møde varer 30 minutter eller 1/2 time

        var slut = new Date(start.getTime() + 30 * 60 * 1000);
        super(start, slut, kommentar, kundenavn, tlfnr, mail);

    }
}

