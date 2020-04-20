//Lavet af VR

//roid = revisorobjekt id, på revisoreren som er logget ind
//ro = revisorobjekt på revisoren som er logget ind

import * as utils from "./modules/utils";
import * as kalender from "./modules/kalender";

let møder;

var token = localStorage.getItem('token');
$.ajax({url: 'localhost:3000/userByToken/' + token, success: function(result) {
        let id = result.user._id;
        let revisorer = utils.formaterRevisor(result);

        $.ajax({url: "http://localhost:3000/moede/" + id, success: function(resultMoeder){
                møder = utils.formaterMoeder(resultMoeder);
                //Sorterer møder efter dato
                møder.sort(sorterEfterMødeDato);
            }});
    }});

var roid = sessionStorage.getItem('loggedInRevisorId');
var ro = new Array( JSON.parse (sessionStorage.getItem('loggedInRevisorObject')) );

//if (roid == null || ro == null) {
    //location.href = "Login.html";
//}

ro = formaterRevisor(ro)[0];

console.log(ro);
//lavet af MM
//Henter og indsætter info om hvilken revisor der er logget ind
document.getElementById('revisorNavn').innerHTML = ro.getNavn();


var år;
var måned;
var dag;

//Laver en variabel som sættes til dagens dato
var idag = new Date ();

//Sætter selectelementernes defaultvalue til at være dagens dato
document.getElementById('år').value = idag.getFullYear();
document.getElementById('måned').value = idag.getMonth();
document.getElementById('dag').value = idag.getDate();

//Når man har valgt en dato i select, så skal den run funktionen hentMøder()
document.getElementById('år').addEventListener('change', hentMøder);
document.getElementById('måned').addEventListener('change', hentMøder);
document.getElementById('dag').addEventListener('change', hentMøder);


hentMøder();

function hentMøder() {
    document.getElementById("mødeoversigt").innerHTML = "";
    år = document.getElementById("år").value;
    måned = document.getElementById("måned").value;
    dag = document.getElementById("dag").value;


    var valgtDato = new Date (år, måned, dag);
    var erDerMøder = false;

    for (var i=0; i<møder.length; i++){

        //Skaber variabler til mødets tider og dato
        var startTid = møder[i].getStartTid();
        var slutTid = møder[i].getSlutTid();
        var mødeDato = new Date (startTid.getFullYear(), startTid.getMonth(), startTid.getDate());


        //if-statement som siger, at hvis mødedato lig valgtdato, så udskriver den mødeobjektet
        if (valgtDato.getFullYear() == mødeDato.getFullYear() &&
        valgtDato.getMonth() == mødeDato.getMonth() && valgtDato.getDate() == mødeDato.getDate()) {
            var kundenavn = møder[i].getKundenavn();
            var kommentar = møder[i].getKommentar();
            var mail = møder[i].getMail();
            var tlfnr = møder[i].getTlfnr();
            var startTid = møder[i].getStartTid();
            var slutTid = møder[i].getSlutTid();
            var id = møder[i].getID();
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
            møde.innerHTML = "Kundenavn: " + kundenavn + "<br />" + mail + "<br />" + tlfnr + "<br />" + startTid + " - " + slutTid + "<br />" + "Yderligere kommentar: " + kommentar + "<br />" + "<button id='sletMøde' onclick='sletMøde(" + id + ")'>Slet Møde</button>";
            møde.classList = "enkelteMøde";
            mødeoversigt.appendChild(møde);
        }
    }

    if(!erDerMøder) document.getElementById("mødeoversigt").innerHTML = 'Der er ingen møder denne dag :)';
}


//Lavet af FH
//Sletter et møde med et specifikt ID
function sletMøde(id) {

    let con = confirm ("Er du sikker på, at du vil slette mødet?");
    if (!con) return;
    //Looper gennem alle møder, og finder den som har det ID som vi ønsker at slette
    for (var i = 0; i < ro.getMøder().length; i++) {
        if (ro.getMøder() [i].getID() == id) {
            console.log(ro.getMøder() [i]);

            //Fjern mødet fra arrayen ved splice-funktionen
            møder.splice(i, 1);
            console.log(møder);

            //Lægger herefter den nye data op i localstorage og sessionstorage.
            localStorage.setItem('gemtRevisorhus', JSON.stringify(grh));
            sessionStorage.setItem('loggedInRevisorObject', JSON.stringify(grh.getRevisorer()[roid]));

            $.ajax({
                type: 'DELETE',
                url: "http://localhost:3000/moede/" + id  })
                .done(function(resultMoeder) {
                alert ("Mødet er blevet slettet")
                });

            //refresher møderne på den nuværende dag
            hentMøder();

            //Bryd ud af loopet, da mødet med det rette ID er fundet
            break;
        }

    }
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