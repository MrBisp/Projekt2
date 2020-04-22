//Lavet af VR

//roid = revisorobjekt id, på revisoreren som er logget ind
//ro = revisorobjekt på revisoren som er logget ind

import * as utils from "./modules/utils.mjs";

let møder;
let ro;

var token = localStorage.getItem('token');
if(token == null) location.href = 'Login.html';
//Asset properties
console.log('token: ' + token);

$.ajax({url: 'http://localhost:3000/user/userByToken/',
    type: "GET",
    beforeSend: function(request) {
        request.setRequestHeader("Authorization", 'Bearer ' + token);
    },
    success: function(result) {
        let kid = result.user._id;
        ro = result.user;
        var goToURL = "http://localhost:3000/moede/";
        if (ro.type == 2) goToURL += 'kunde/';

        $.ajax({url: goToURL + kid, success: (result) => {
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
                    ro = utils.formaterKundeObj(ro);
                    //Sorterer møder efter dato
                    ro.moeder.sort(sorterEfterMødeDato);
                    createPage();
                } else {
                    alert("Noget gik galt - prøv venligst igen, ellers kontakt aministrationen...")
                }
        }});
        console.log(ro);
    }, error: function() {
        alert('Log ind igen');
        location.href = 'Login.html';
    }
});



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
        console.log("Revisor");
       hentMøderRevisor();
    } else if (ro.type === 2) {
        //Kunde
        //Når man har valgt en dato i select, så skal den run funktionen hentMøder()
        document.getElementById('år').addEventListener('change', hentMøderRevisor);
        document.getElementById('måned').addEventListener('change', hentMøderRevisor);
        document.getElementById('dag').addEventListener('change', hentMøderRevisor);
        console.log("Kunde");
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
            var email = ro.moeder[i].getEmail();
            var tlfnr = ro.moeder[i].getTlfnr();
            var startTid = ro.moeder[i].getStartTid();
            var slutTid = ro.moeder[i].getSlutTid();
            var id = ro.moeder[i]._id;
            console.log(id);
            erDerMøder = true;
            /*
            console.log(kundenavn);
            console.log(kommentar);
            console.log(email);
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
            møde.innerHTML = "Kundenavn: " + kundenavn + "<br />Email: " + email + "<br />Tlf: " + tlfnr + "<br />" + startTid + " - " + slutTid + "<br />" + "Yderligere kommentar: " + kommentar + "<br />" + "<button class='sletmoede' data-id='"+id+"' onClick='sletmoede(this)'>Slet Møde</button>";
            møde.classList = "enkelteMøde";
            mødeoversigt.appendChild(møde);
        }
    }

    if(!erDerMøder) document.getElementById("mødeoversigt").innerHTML = 'Der er ingen møder denne dag :)';
}

function hentMøderRevisor() {
    $("#mødeoversigt").text("");
    $("#mødeoversigt .enkelteMøder").remove();
    år = document.getElementById("år").value;
    måned = document.getElementById("måned").value;
    dag = document.getElementById("dag").value;
    

    var valgtDato = new Date (år, måned, dag);
    var erDerMøder = false;
    $("#mødeoversigt").html("<h3>Dagens møder</h3>");

    for (var i=0; i<ro.moeder.length; i++) {
        console.log(ro.moeder[i]);
        //Skaber variabler til mødets tider og dato
        var startTid = ro.moeder[i].getStartTid();
        var slutTid = ro.moeder[i].getSlutTid();
        var mødeDato = new Date(startTid.getFullYear(), startTid.getMonth(), startTid.getDate());


        if (!ro.moeder[i].approved) {
            var unapprovedmoeder = document.getElementById("unapprovedmoeder");
            var kommentar = ro.moeder[i].getKommentar();
            var email = ro.moeder[i].getEmail();
            var tlfnr = ro.moeder[i].getTlfnr();
            var dato = ro.moeder[i].getStartTid().getDate() + "/" + ro.moeder[i].getStartTid().getMonth() + "/" + ro.moeder[i].getStartTid().getFullYear();
            var startTid = ro.moeder[i].getStartTid();
            var slutTid = ro.moeder[i].getSlutTid();
            var status = "Not Approved";
            var id = ro.moeder[i]._id;

            //Gør mødestart/slut læseligt
            startTid = startTid.toLocaleTimeString().substring(0, 5);
            slutTid = slutTid.toLocaleTimeString().substring(0, 5);

            $("#unapprovedmoeder").html("<h3>Afventer godkendelse</h3>");


            //Skaber et element til unapprovedmøderne uanset hvilken dag, som revisoren vælger
            var unapprovedmøde = document.createElement("div");
            unapprovedmøde.innerHTML = "Kundenavn: " + ro.moeder[i].kundeNavn + "<br />Email: " +  email + "<br />Tlf: " + tlfnr + "<br />Dato: " + dato + "<br />"+ startTid + " - " + slutTid + "<br />" + "Yderligere kommentar: " + kommentar + "<br />" + "Status: " + status + "<br />" + "<button class='godkend' data-id='" + id + "' onClick='approveMoede(this)'>Godkend</button>"+
            "<button class='sletmoede' data-id='" + id + "' onClick='sletmoede(this)'>Afvis</button>";
            unapprovedmøde.classList = "unapprovedmøde";
            unapprovedmoeder.appendChild(unapprovedmøde);
        }
        else if
            //if-statement som siger, at hvis mødedato lig valgtdato, så udskriver den mødeobjektet
            (valgtDato.getFullYear() == mødeDato.getFullYear() &&
            valgtDato.getMonth() == mødeDato.getMonth() && valgtDato.getDate() == mødeDato.getDate()) {
            var kundenavn = ro.moeder[i].getKundenavn();
            var kommentar = ro.moeder[i].getKommentar();
            var email = ro.moeder[i].getEmail();
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
            console.log(email);
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
            møde.innerHTML = "Kundenavn: " + kundenavn + "<br />" + email + "<br />" + tlfnr + "<br />" + startTid + " - " + slutTid + "<br />" + "Yderligere kommentar: " + kommentar + "<br />" + "<button class='sletmoede' data-id='" + id + "' onClick='sletmoede(this)'>Slet Møde</button>";
            møde.classList = "enkelteMøder";
            mødeoversigt.appendChild(møde);
        }
    }
    if(!erDerMøder) document.getElementById("mødeoversigt").innerText = 'Der er ingen møder denne dag :)';
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

