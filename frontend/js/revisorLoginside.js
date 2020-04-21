//Lavet af VR

//roid = revisorobjekt id, på revisoreren som er logget ind
//ro = revisorobjekt på revisoren som er logget ind

import * as utils from "./modules/utils.mjs";

let møder;
let ro;

var token = localStorage.getItem('token');

$.ajax({url: 'http://localhost:3000/userByToken/' + token,
    type: "GET",
    success: function(result) {
        let kid = result.user._id;
        ro = result.user;
        $.ajax({url: "http://localhost:3000/moede/" + kid, success: (result) => {
                ro.moeder = result;
                console.log(result);
                if(ro.type === 1) {
                    //Revisor
                    console.log("2" + result);
                    ro = utils.formaterRevisorObj(ro);
                    //Sorterer møder efter dato
                    ro.moeder.sort(sorterEfterMødeDato);
                    createPage();
                } else if (ro.type === 2){
                    //Kunde
                    ro = utils.formaterKundeObj(result.user[0]);
                    //Sorterer møder efter dato
                    ro.moeder.sort(sorterEfterMødeDato);
                    createPage();
                } else {
                    alert("Noget gik galt - prøv venligst igen, ellers kontakt aministrationen...")
                }
        }});
        console.log(ro);
}});



//if (roid == null || ro == null) {
    //location.href = "Login.html";
//}

//ro = formaterRevisor(ro)[0];
var år;
var måned;
var dag;
//Laver en variabel som sættes til dagens dato
var idag = new Date ();

function createPage () {
    console.log(" 3" + ro);
//lavet af MM
//Henter og indsætter info om hvilken revisor der er logget ind
    document.getElementById('revisorNavn').innerHTML = ro.getNavn();

//Sætter selectelementernes defaultvalue til at være dagens dato
    document.getElementById('år').value = idag.getFullYear();
    document.getElementById('måned').value = idag.getMonth();
    document.getElementById('dag').value = idag.getDate();

    if (ro.type === 1) {
        //Revisor
//Når man har valgt en dato i select, så skal den run funktionen hentMøder()
        document.getElementById('år').addEventListener('change', hentMøderRevisor);
        document.getElementById('måned').addEventListener('change', hentMøderRevisor);
        document.getElementById('dag').addEventListener('change', hentMøderRevisor);

        hentMøderRevisor();
    } else if (ro.type === 2) {
        //Kunde
        //Når man har valgt en dato i select, så skal den run funktionen hentMøder()
        document.getElementById('år').addEventListener('change', hentMøderRevisor);
        document.getElementById('måned').addEventListener('change', hentMøderRevisor);
        document.getElementById('dag').addEventListener('change', hentMøderRevisor);

        hentMøderKunde();
    }
}

function hentMøderKunde() {
    document.getElementById("mødeoversigt").innerHTML = "";
    år = document.getElementById("år").value;
    måned = document.getElementById("måned").value;
    dag = document.getElementById("dag").value;


    var valgtDato = new Date (år, måned, dag);
    var erDerMøder = false;

    for (var i=0; i<ro.moeder.length; i++){
        console.log(ro.moeder[i]);
        //Skaber variabler til mødets tider og dato
        var startTid = ro.moeder[i].getStartTid();
        var slutTid = ro.moeder[i].getSlutTid();
        var mødeDato = new Date (startTid.getFullYear(), startTid.getMonth(), startTid.getDate());


        //if-statement som siger, at hvis mødedato lig valgtdato, så udskriver den mødeobjektet
        if (valgtDato.getFullYear() == mødeDato.getFullYear() &&
            valgtDato.getMonth() == mødeDato.getMonth() && valgtDato.getDate() == mødeDato.getDate()) {
            var kundenavn = ro.moeder[i].getKundenavn();
            var kommentar = ro.moeder[i].getKommentar();
            var mail = ro.moeder[i].getMail();
            var tlfnr = ro.moeder[i].getTlfnr();
            var startTid = ro.moeder[i].getStartTid();
            var slutTid = ro.moeder[i].getSlutTid();
            var id = ro.moeder[i]._id;
            var id1 = "'" + id + "'";
            console.log(id);
            erDerMøder = true;
            /*
            console.log(kundenavn);
            console.log(kommentar);
            console.log(mail);
            console.log(tlfnr);
            console.log(startTid);

             */

            //Gør mødestart/slut læseligt
            startTid = startTid.toLocaleTimeString().substring(0,5);
            slutTid = slutTid.toLocaleTimeString().substring(0,5);

            //Laver en variabel for div'en "mødeoversigt
            var mødeoversigt = document.getElementById("mødeoversigt");

            //Skaber et element til møderne for den dag, hvor kundens informationer indsættes i HTML
            var møde = document.createElement("div");
            møde.innerHTML = "Kundenavn: " + kundenavn + "<br />" + mail + "<br />" + tlfnr + "<br />" + startTid + " - " + slutTid + "<br />" + "Yderligere kommentar: " + kommentar + "<br />" + "<button class='sletmoede' data-id='"+id+"' onClick='sletmoede(this)'>Slet Møde</button>";
            møde.classList = "enkelteMøde";
            mødeoversigt.appendChild(møde);
        }
    }

    if(!erDerMøder) document.getElementById("mødeoversigt").innerHTML = 'Der er ingen møder denne dag :)';
}

function hentMøderRevisor() {
    document.getElementById("mødeoversigt").innerHTML = "";
    år = document.getElementById("år").value;
    måned = document.getElementById("måned").value;
    dag = document.getElementById("dag").value;
    

    var valgtDato = new Date (år, måned, dag);
    var erDerMøder = false;

    for (var i=0; i<ro.moeder.length; i++) {
        console.log(ro.moeder[i]);
        //Skaber variabler til mødets tider og dato
        var startTid = ro.moeder[i].getStartTid();
        var slutTid = ro.moeder[i].getSlutTid();
        var mødeDato = new Date(startTid.getFullYear(), startTid.getMonth(), startTid.getDate());


        if (!ro.moeder[i].approved) {
            var unapprovedmoeder = document.getElementById("unapprovedmoeder");

            //Skaber et element til unapprovedmøderne uanset hvilken dag, som revisoren vælger
            var unapprovedmøde = document.createElement("div");
            unapprovedmøde.innerHTML = "Kundenavn: " + kundenavn + "<br />" + mail + "<br />" + tlfnr + "<br />" + startTid + " - " + slutTid + "<br />" + "Yderligere kommentar: " + kommentar + "<br />" + "<button class='godkend' onClick='godkend'>Godkend</button>" + "<br />"
            "<button class='sletmoede' data-id='" + id + "' onClick='sletmoede(this)'>Afvis</button>";
            unapprovedmøde.classList = "enkelteUnapprovedMøde";
            unapprovedmoeder.appendChild(unapprovedmøde);
        }
        if else {
            //if-statement som siger, at hvis mødedato lig valgtdato, så udskriver den mødeobjektet
            (valgtDato.getFullYear() == mødeDato.getFullYear() &&
            valgtDato.getMonth() == mødeDato.getMonth() && valgtDato.getDate() == mødeDato.getDate()) {
            var kundenavn = ro.moeder[i].getKundenavn();
            var kommentar = ro.moeder[i].getKommentar();
            var mail = ro.moeder[i].getMail();
            var tlfnr = ro.moeder[i].getTlfnr();
            var startTid = ro.moeder[i].getStartTid();
            var slutTid = ro.moeder[i].getSlutTid();
            var id = ro.moeder[i]._id;
            var id1 = "'" + id + "'";
            console.log(id);
            erDerMøder = true;
            /*
            console.log(kundenavn);
            console.log(kommentar);
            console.log(mail);
            console.log(tlfnr);
            console.log(startTid);

             */

            //Gør mødestart/slut læseligt
            startTid = startTid.toLocaleTimeString().substring(0, 5);
            slutTid = slutTid.toLocaleTimeString().substring(0, 5);

            //Laver en variabel for div'en "mødeoversigt
            var mødeoversigt = document.getElementById("mødeoversigt");

            //Skaber et element til møderne for den dag, hvor kundens informationer indsættes i HTML
            var møde = document.createElement("div");
            møde.innerHTML = "Kundenavn: " + kundenavn + "<br />" + mail + "<br />" + tlfnr + "<br />" + startTid + " - " + slutTid + "<br />" + "Yderligere kommentar: " + kommentar + "<br />" + "<button class='sletmoede' data-id='" + id + "' onClick='sletmoede(this)'>Slet Møde</button>";
            møde.classList = "enkelteMøde";
            mødeoversigt.appendChild(møde);
        }
    }
    }

    if(!erDerMøder) document.getElementById("mødeoversigt").innerHTML = 'Der er ingen møder denne dag :)';
}



//Lavet af VR
//Log af ved at rydde sessionstorage
function logAf(){
    sessionStorage.removeItem('loggedInRevisorObject');
    sessionStorage.removeItem('loggedInRevisorId');
    window.location.href = 'Login.html';
}

//Lavet af FH
//Sorterer efter mødedato
//Retunerer -1 hvis a kommer først og 1 hvis b kommer først
function sorterEfterMødeDato(a, b){
    var r = 1;

    if(a.getStartTid().getTime() < b.getStartTid().getTime()){
        r = -1;
    }
    return r;
}