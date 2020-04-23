//Lavet af FH
import * as kalender from './modules/kalender.mjs';
import * as utils from './modules/utils.mjs';
//import {formaterMoederRevisor} from "./modules/utils.mjs";

let rh = new Revisorhus();
let revisorer = [];
let loggedIn = false;
let userID;

var token = localStorage.getItem('token');
//Asset properties
console.log('token: ' + token);

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
    revisorer = utils.formaterRevisor(result);

    let defaultRevisorId = revisorer[0]._id;
    $.ajax({url: "http://localhost:3000/moede/" + defaultRevisorId, success: function(resultMoeder){
        console.log(resultMoeder);
        revisorer[0].moeder = utils.formaterMoederRevisor(resultMoeder);
        console.log(revisorer);

        for(let i=0; i<revisorer.length; i++){
            rh.addRevisor(revisorer[i]);
            $('#revisorOption').append("<option value='" + result[i]._id + "'>" + result[i].navn + "</option>")
        }
        kalender.initKalender(revisorer[0]);
    }});
}});

//TIlføj eventhandler for måned-knapper, så kalenderen kan opdateres når der vælges en ny måned
var månedknapper = document.getElementsByClassName('månedKnap');
for (var i = 0; i<månedknapper.length; i++){
    månedknapper[i].addEventListener('click', function(){
        //console.log('Månedsknap klikket');
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
        for (var i =0; i<tidspunkter.length; i++) {
            tidspunkter[i].classList.remove("aktiv");
        }
        document.getElementById('opretMødeContainer').style.display = 'block';
        let nuværendeStarttidspunkt = JSON.parse(e.target.getAttribute('data-start'));
        let nuværendeSluttidspunkt = JSON.parse(e.target.getAttribute('data-slut'));
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
        let revisor = revisorer.find(revisor => revisor._id == revisorId);
        revisor.setMøder(utils.formaterMoederRevisor(resultMoeder));
        kalender.setVisKalenderFor(revisor);
        kalender.refresh();
    }});
});

//submit
//Inspiration: https://stackoverflow.com/a/18485054
$("#opretMødeForm").submit(function (e) {
    e.preventDefault();

    let inputData = $("#opretMødeForm").serialize();
    inputData += "&startTime=" + new Date(JSON.parse($('.tidspunkt.aktiv').data('start'))).toISOString();
    inputData += "&endTime=" + new Date(JSON.parse($('.tidspunkt.aktiv').data('slut'))).toISOString();
    inputData += "&revisor=" + $('#revisorOption').find(":selected").val();

    if(loggedIn) {
        inputData += '&kunde=' + userID;
        console.log('Vi er logget ind!');
    }

    console.log(inputData);



    //Marza: Eksempel på avanceret api kald
    if(2+2===1 || true) {
        $.ajax({
            url: "http://localhost:3000/moede",
            type: 'post',
            dataType: 'json',
            data: inputData,
            success: function (result) {
                console.log(result);
                alert('Mødet blev succesfuldt oprettet');
                //location.reload();
            },
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
    }
});






