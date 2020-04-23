import * as utils from "./modules/utils.mjs";

let ro;
var token = localStorage.getItem('token');
if(token == null) location.href = 'Login.html';

let år, måned, dag, idag, valgtDato, erDerMøder, kommentar, email, tlfnr, dato, startTid, slutTid, status, id, kundeNavn;

//Logget ind
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

        $.ajax({url: goToURL + kid,
            success: (result) => {
                ro.moeder = result;
                //Revisor
                if(ro.type === 1) {
                    ro = utils.formaterRevisorObj(ro);
                    console.log(ro);
                    //Sorterer møder efter dato
                    ro.moeder.sort(sorterEfterMødeDato);
                    createPage();
                //Kunde
                } else if (ro.type === 2){
                    ro = utils.formaterKundeObj(ro);
                    console.log(ro);
                    //Sorterer møder efter dato
                    ro.moeder.sort(sorterEfterMødeDato);
                    createPage();
                }
            }, error: function () {
                alert("Noget gik galt - prøv venligst igen, ellers kontakt aministrationen...");
            }
        });

    }, error: function() {
        alert('Log ind igen');
        location.href = 'Login.html';
    }
});

function createPage () {
    document.getElementById("mødeoversigt").innerHTML = "";

    erDerMøder = false;

    //Laver en variabel som sættes til dagens dato

    idag = new Date ();
    //Henter og indsætter info om hvilken revisor der er logget ind
    document.getElementById('revisorNavn').innerHTML = ro.getNavn();

    //Sætter selectelementernes defaultvalue til at være dagens dato
    document.getElementById('år').value = idag.getFullYear();
    document.getElementById('måned').value = idag.getMonth();
    document.getElementById('dag').value = idag.getDate();

    //Definerer varibaler som både bruges i hentMøderKunde og hentMøderRevisor
    opdaterDato();

    //Add eventlistener
    document.getElementById('år').addEventListener('change', opdaterDato);
    document.getElementById('måned').addEventListener('change', opdaterDato);
    document.getElementById('dag').addEventListener('change', opdaterDato);

    //Revisor
    if (ro.type === 1) {
        document.getElementById('år').addEventListener('change', hentMøderRevisor);
        document.getElementById('måned').addEventListener('change', hentMøderRevisor);
        document.getElementById('dag').addEventListener('change', hentMøderRevisor);
        hentMøderRevisor();
    //Kunde
    } else if (ro.type === 2) {
        document.getElementById('år').addEventListener('change', hentMøderKunde);
        document.getElementById('måned').addEventListener('change', hentMøderKunde);
        document.getElementById('dag').addEventListener('change', hentMøderKunde);
        $('body').addClass('skjulDato');
        hentMøderKunde();
    }
}

function hentMøderKunde() {
    $("#mødeoversigt").text("");
    $("#mødeoversigt .enkelteMøder").remove();
    $("#mødeoversigt").html("<h3>Mine møder</h3>");
    erDerMøder = false;

    for (var i=0; i<ro.moeder.length; i++){
        //Skaber variabler til mødets tider og dato
        definerMødeVariabler(ro.moeder[i]);

        //console.log(id);
        erDerMøder = true;

        status = status ? 'Godkendt': 'Afventer godkendelse';

        //Gør mødestart/slut læseligt
        startTid = startTid.toLocaleTimeString().substring(0,5);
        slutTid = slutTid.toLocaleTimeString().substring(0,5);

        //Laver en variabel for div'en "mødeoversigt
        var mødeoversigt = document.getElementById("mødeoversigt");

        //Skaber et element til møderne for den dag, hvor kundens informationer indsættes i HTML
        var møde = document.createElement("div");
        møde.innerHTML = "Kundenavn: " + kundeNavn + "<br />Email: " + email + "<br />Tlf: " + tlfnr;
        møde.innerHTML +="<br />" + startTid + " - " + slutTid + "<br />" + "Yderligere kommentar: " + kommentar;
        møde.innerHTML += '<br /> Dato: ' + dato;
        møde.innerHTML += "<br />Status: " + status + "<br><button class='sletmoede' data-id='"+id+"' onClick='sletmoede(this)'>Slet Møde</button>";
        møde.classList = "enkelteMøder";
        mødeoversigt.appendChild(møde);

    }

    if(!erDerMøder) document.getElementById("mødeoversigt").innerHTML = 'Du har ingen møder. Book et :)';
}

function hentMøderRevisor() {
    $("#mødeoversigt").text("");
    $("#mødeoversigt .enkelteMøder").remove();
    $("#mødeoversigt").html("<h3>Dagens møder</h3>");

    var valgtDato = new Date (år, måned, dag);
    var erDerMøder = false;

    $("#unapprovedmoeder").html("<h3>Afventer godkendelse</h3>");

    for (var i=0; i<ro.moeder.length; i++) {
        //console.log(ro.moeder[i]);
        //Skaber variabler til mødets tider og dato
        definerMødeVariabler(ro.moeder[i]);
        var mødeDato = new Date(startTid.getFullYear(), startTid.getMonth(), startTid.getDate());

        if (!ro.moeder[i].approved) {
            console.log('not approved');
            var unapprovedmoeder = document.getElementById("unapprovedmoeder");

            //Gør mødestart/slut læseligt
            startTid = startTid.toLocaleTimeString().substring(0, 5);
            slutTid = slutTid.toLocaleTimeString().substring(0, 5);


            //Skaber et element til unapprovedmøderne uanset hvilken dag, som revisoren vælger
            var unapprovedmøde = document.createElement("div");
            unapprovedmøde.innerHTML = "Kundenavn: " + ro.moeder[i].kundeNavn + "<br />Email: " +  email + "<br />Tlf: " + tlfnr + "<br />Dato: " + dato + "<br />"+ startTid + " - " + slutTid + "<br />" + "Yderligere kommentar: " + kommentar + "<br />" + "<button class='godkend' data-id='" + id + "' onClick='approveMoede(this)'>Godkend</button>"+
            "<button class='sletmoede' data-id='" + id + "' onClick='sletmoede(this)'>Afvis</button>";
            unapprovedmøde.classList = "unapprovedmøde";
            unapprovedmoeder.appendChild(unapprovedmøde);
        }
        else if
            //if-statement som siger, at hvis mødedato lig valgtdato, så udskriver den mødeobjektet
            (valgtDato.getFullYear() == mødeDato.getFullYear() &&
            valgtDato.getMonth() == mødeDato.getMonth() && valgtDato.getDate() == mødeDato.getDate()) {
            erDerMøder = true;

            //Gør mødestart/slut læseligt
            startTid = startTid.toLocaleTimeString().substring(0, 5);
            slutTid = slutTid.toLocaleTimeString().substring(0, 5);

            //Laver en variabel for div'en "mødeoversigt
            var mødeoversigt = document.getElementById("mødeoversigt");

            //Skaber et element til møderne for den dag, hvor kundens informationer indsættes i HTML
            var møde = document.createElement("div");
            møde.innerHTML = "Kundenavn: " + kundeNavn + "<br />" + email + "<br />" + tlfnr + "<br />" + startTid + " - " + slutTid + "<br />" + "Yderligere kommentar: " + kommentar + "<br />" + "<button class='sletmoede' data-id='" + id + "' onClick='sletmoede(this)'>Slet Møde</button>";
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

function definerMødeVariabler(m){
    kommentar = m.getKommentar();
    email = m.getEmail();
    tlfnr = m.getTlfnr();
    dato = m.getStartTid().getDate() + "/" + m.getStartTid().getMonth() + "/" + m.getStartTid().getFullYear();
    startTid = m.getStartTid();
    slutTid = m.getSlutTid();
    kundeNavn = m.getKundenavn();
    status = m.getStatus();
    id = m._id;
}

function opdaterDato(){
    år = document.getElementById("år").value;
    måned = document.getElementById("måned").value;
    dag = document.getElementById("dag").value;
    valgtDato = new Date (år, måned, dag);
    if (ro.type === 1){
        hentMøderRevisor();
    } else {
        hentMøderKunde();
    }
}