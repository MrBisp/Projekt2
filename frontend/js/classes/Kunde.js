class Kunde extends User {
    constructor(navn, email, tlf, username, password, type, privatKunde, erhvervsKunde) {
        super(navn, email, tlf, username, password, type);
        this.privatKunde = privatKunde;
        this.erhvervsKunde = erhvervsKunde;
    }

    printInfoKunde(){

        let kundeType = "";

        if(this.privatKunde == true || this.erhvervsKunde == false){
            kundeType = "Privat Kunde";
        } else if (this.erhvervsKunde == true || this.privatKunde == false){
            kundeType = "Erhvervs Kunde";
        } else {
            kundeType = "Privat- og Erhvervskunde";
        }

        if(this.møder[0] == null){
            console.log(this.printInfo() + "\n Typekunde: " + kundeType + "\n Møder: Kunden har ingen møder");
        } else {
            console.log(this.printInfo() + "\n Typekunde: " + kundeType + "\n Møder: ");
            for (let i = 0; i<this.møder.length; i++){
                console.log("Møde nr. " + i + ", Start: " + this.møder[i].startTime + ", Slut: " + this.møder[i].endTime + "Mødet afholdes med " + this.møder[i].navn);
            }
        }
    }
}