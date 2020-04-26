class User {
    constructor(navn, email, tlf, username, password, type){
        this.navn = navn;
        this.email = email;
        this.tlf = tlf;
        this.username = username;
        this.password = password;
        this.moeder = [];
        this.type = type;
    }

    tilføjMøder (møde) {
        this.moeder.push(møde);
    }
    getMøder(){
        return this.moeder;
    }
    setMøder(a){
        this.moeder = a;
    }
    getNavn(){
        return this.navn;
    }
    getUsername(){
        return this.username;
    }

}