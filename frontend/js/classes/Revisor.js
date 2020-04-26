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
}
