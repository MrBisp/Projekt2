class Revisor extends User {
    constructor(navn, email, tlf, username, kodeord, startDag, slutDag){
        super(navn, email, tlf, username, kodeord, 1);
        this.startDag = startDag;
        this.slutDag = slutDag;
    }
    getStartdag(){
        return this.startDag;
    }

    getSlutdag(){
        return this.slutDag;
    }
    //for at få vist hvor mange møder den pågældende revisor har,
    // for loop kører gennemn antal af møder booket i systemet og
    // retunere det tal fra det første start tid til den sidste slut tid¨

    printInfoRevisor(){
        console.log(this.printInfo() + "\nDenne revisor har møder fra kl:" + this.startDag + " til kl:" + this.slutDag + "\nNuværende aftalte møder: ");
         for (var i=0; i<this.moeder.length; i++){
             console.log("Møde antal" + i + "start: " + this.moeder[i].startTime + "slut: " + this.moeder[i].endTime);
         }
    }
}
