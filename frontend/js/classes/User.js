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
        //her kan man tilføje møde til revisoren, admin/revisor adgang
    }

    getInfo(){
        var text = this.navn + "\n";
        for (i = 0; i < this.moeder.length; i++){
            text += this.moeder[i].getInfo() + "\n"
        }
        return text;
    }

    getMøder(){
        return this.moeder;
    }

    setMøder(a){
        this.moeder = a;
    }

    printInfo(){
        var info = "UserInfo\n Brugertype: " + this.type + " \n Navn: " + this.navn;
        return info;
    }

    getNavn(){
        return this.navn;
    }

    getUsername(){
        return this.username;
    }


}