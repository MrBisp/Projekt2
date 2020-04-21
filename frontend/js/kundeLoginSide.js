import * as utils from "./modules/utils";

let ko;

var token = localStorage.getItem('token');

$.ajax({url: 'localhost:3000/userByToken/' + token, success: function(result) {
        let kid = result.user._id;
        ko = result.user;

        $.ajax({url: "http://localhost:3000/moede/" + id, success: function(resultMoeder){
                ko.moeder = resultMoeder;
                ko = utils.formaterKundeObj(result.user[0]);
                //Sorterer møder efter dato
                ko.moeder.sort(sorterEfterMødeDato);
            }});
}});

document.getElementById('kundeNavn').innerHTML = ko.getNavn();

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
            møde.innerHTML = "Kundenavn: " + kundenavn + "<br />" + mail + "<br />" + tlfnr + "<br />" + startTid + " - " + slutTid + "<br />" + "Yderligere kommentar: " + kommentar + "<br />" + "<button id='sletmoede' onclick='sletmoede(" + id + ")'>Slet Møde</button>";
            møde.classList = "enkelteMøde";
            mødeoversigt.appendChild(møde);
        }
    }

    if(!erDerMøder) document.getElementById("mødeoversigt").innerHTML = 'Der er ingen møder denne dag :)';
}