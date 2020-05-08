//Lavet af FH
import * as kalender from './modules/kalender.mjs';
import * as utils from './modules/utils.mjs';

let revisorer = [];
let loggedIn = false;
let userID;

var token = localStorage.getItem('token');
console.log('token: ' + token);

//Laver request, for at se om vi er logget ind
$.ajax({url: 'http://localhost:3000/user/userByToken/',
    type: "GET",
    beforeSend: function(request) {
        request.setRequestHeader("Authorization", 'Bearer ' + token);
    },
    success: function(result){
        const user = result.user;
        userID = user._id;
        //Kunde er logget ind
        if(user.type == 2){
            loggedIn = true;
            console.log(user);
            $('#kundenavn').val(user.navn);
            $('#tlfnr').val(user.tlf);
            $('#mail').val(user.email);

        } else {
            alert('Man kan ikke oprette et møde, når man er logget ind som revisor');
            location.href = 'minSide.html';
        }
    }

});

//Laver et ajax call med jQuery, og får på den måde revisorerne
$.ajax({url: "http://localhost:3000/user/revisor", success: function(result){
    console.log(result);
    revisorer = utils.formaterRevisorArray(result);

    let defaultRevisorId = revisorer[0]._id;
    $.ajax({url: "http://localhost:3000/moede/" + defaultRevisorId, success: function(resultMoeder){
        console.log(resultMoeder);
        revisorer[0].moeder = utils.formaterArrayMoederRevisor(resultMoeder);

        //Tilføjer alle revisorer til select, så kunden kan vælge mellem de oprettede revisorer
        for(let i=0; i<revisorer.length; i++){
            $('#revisorOption').append("<option value='" + result[i]._id + "'>" + result[i].navn + "</option>")
        }
        //Initlaiserer kalenderen
        kalender.initKalender(revisorer[0]);
    }});
}});

//TIlføj eventhandler for måned-knapper, så kalenderen kan opdateres når der vælges en ny måned
var månedknapper = document.getElementsByClassName('månedKnap');
for (var i = 0; i<månedknapper.length; i++){
    månedknapper[i].addEventListener('click', function(){
        kalender.opdaterMåned(this.getAttribute('data-måned'));
    });
}

//Tilføj event listener for de to pile, til at vælge et nyt år
document.getElementById('årVenstre').addEventListener('click', function(){
    kalender.opdaterÅr(-1);
});
document.getElementById('årHøjre').addEventListener('click', function(){
    kalender.opdaterÅr(1);
});

//Tilføjer eventlistener til dynamisk tilføjede elementer (altså via javascript), hvilket ugedagene er.
//Kilde: https://stackoverflow.com/a/27373951
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('iMåneden')) {
        kalender.opdaterTidsplan(e.target);
    } else if (e.target.classList.contains('tidspunkt')) {
        var tidspunkter = document.getElementsByClassName("tidspunkt");
        //Sletter classen 'aktiv' fra alle tidspunkterne først
        for (var i =0; i<tidspunkter.length; i++) {
            tidspunkter[i].classList.remove("aktiv");
        }
        //Tilføjer klassen 'aktiv' for det tidspunkt der er klikket på
        document.getElementById('opretMødeContainer').style.display = 'block';
        e.target.classList+= " aktiv";
    }
});

//Når mødelængden ændres
document.getElementById('mødeOption').addEventListener('change', function(e){
    kalender.refresh();
});


//Opdaterer kalender alt efter hvilken revisor man vælger
document.getElementById('revisorOption').addEventListener('change', function(e){
    var revisorId = this.value;
    $.ajax({url: "http://localhost:3000/moede/" + revisorId, success: function(resultMoeder){
        //Finder først revisoren i arrayet ud fra dens id og formaterer denne
        let revisor = revisorer.find(revisor => revisor._id == revisorId);
        revisor.setMøder(utils.formaterArrayMoederRevisor(resultMoeder));
        //Kalder kalenderklassens funktioner, for at vise den nye info
        kalender.setVisKalenderFor(revisor);
        kalender.refresh();
    }});
});

//Håndterer submit af form med nyt møde
//Inspiration: https://stackoverflow.com/a/18485054
$("#opretMødeForm").submit(function (e) {
    e.preventDefault();

    //Henter først dataen fra alle formene
    let inputData = $("#opretMødeForm").serialize();

    //Tilføjer anden data som skal bruges i http-requesten, for at oprette mødet
    inputData += "&startTime=" + new Date(JSON.parse($('.tidspunkt.aktiv').data('start'))).toISOString();
    inputData += "&endTime=" + new Date(JSON.parse($('.tidspunkt.aktiv').data('slut'))).toISOString();
    inputData += "&revisor=" + $('#revisorOption').find(":selected").val();

    //Hvis kunden er logget ind, tilføjes kundens ID til requesten
    if(loggedIn) {
        inputData += '&kunde=' + userID;
        console.log('Vi er logget ind!');
    }

    //POSTer det nye møde til databasen
    $.ajax({
        url: "http://localhost:3000/moede",
        type: 'post',
        dataType: 'json',
        data: inputData, //inputdataen fra kunden sendes med her
        //Hvis alt gik som det skulle, giv brugeren besked og reload siden
        success: function (result) {
            console.log(result);
            alert('Mødet blev succesfuldt oprettet');
            location.reload();
        },
        //Hvis et felt ikke er udfyldt korrekt, outputtes fejlen til det tilhørende felt
        error:  function(error) {
            console.log(error);
            console.log(error.responseJSON.errors);
            let e = error.responseJSON.errors;
            for (let field in e) {
                console.log(field);
                $("#fejl" + field).text("Du har ikke indtastet " + field + " korrekt!");
            }
        }
    });
});






