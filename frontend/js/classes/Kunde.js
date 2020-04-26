class Kunde extends User {
    constructor(navn, email, tlf, username, password, type, privatKunde, erhvervsKunde) {
        super(navn, email, tlf, username, password, type);
        this.privatKunde = privatKunde;
        this.erhvervsKunde = erhvervsKunde;
    }

    getKundeType(){
        if(this.privatKunde && !this.erhvervsKunde) return 'Privatkunde';
        else if(!this.privatKunde && this.erhvervsKunde) return 'Erhvervskunde';
        else if(this.privatKunde && this.erhvervsKunde) return 'Privatkunde & Erhvervskunde';
        else return 'Ukendt';
    }
}