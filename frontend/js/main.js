//Lavet af FH
import * as kalender from './modules/kalender.mjs';
import * as utils from './modules/utils.mjs';

let rh = new Revisorhus();
let revisorer = [];

//Laver et ajax call med jQuery, og får på den måde revisorerne
$.ajax({url: "http://localhost:3000/user/revisor", success: function(result){
    revisorer = utils.formaterRevisor(result);

    let defaultRevisorId = revisorer[0]._id;
    $.ajax({url: "http://localhost:3000/moede/" + defaultRevisorId, success: function(resultMoeder){
        console.log(resultMoeder);
        revisorer[0].moeder = utils.formaterMoeder(resultMoeder);
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
 //Når der klikkes på 'Book møde' knappen
/*document.getElementById('bookMødeSubmit').addEventListener('click', function(e){
   e.preventDefault();
   //Kilde: https://stackoverflow.com/a/1085810
   var valgRevisorElement = document.getElementById('revisorOption');
   var valgRevisor = valgRevisorElement.options[valgRevisorElement.selectedIndex].value;
   var kundenavn = document.getElementById('kundenavn');
   var kommentar = document.getElementById('kommentar');

   //funktionen gemtilLS i validation.js benyttes også når der klikkes.
});*/

//Når mødelængden ændres
document.getElementById('mødeOption').addEventListener('change', function(e){
    kalender.refresh();
});


//Lavet af MM

//Opdaterer revisorer, så når der oprettes en ny revisorer, bliver den vist som en option
/*for (var i = 0; i < revisorer.length; i++) {
    console.log(revisorer[i]);
    var nyRevisor = document.createElement("option");
    nyRevisor.value = i;
    nyRevisor.innerText = revisorer[i].getNavn();
    document.getElementById("revisorOption").appendChild(nyRevisor);
}*/

//Opdaterer kalender alt efter hvilken revisor man trykker på
document.getElementById('revisorOption').addEventListener('change', function(e){
    var revisorIndex = this.value;
    kalender.setVisKalenderFor(revisorer.find(revisor => revisorIndex));
    kalender.refresh();
});

//submit
//Inspiration: https://stackoverflow.com/a/18485054
$("#opretMødeForm").submit(function (e) {
    e.preventDefault();

    let inputData = $("#opretMødeForm").serialize();
    inputData += "&startTime=" + new Date(JSON.parse($('.tidspunkt.aktiv').data('start'))).toISOString();
    inputData += "&endTime=" + new Date(JSON.parse($('.tidspunkt.aktiv').data('slut'))).toISOString();
    inputData += "&revisor=" + $('#revisorOption').find(":selected").val() + "&";

    console.log(JSON.stringify(inputData));

    if(2+2===1 || true) {
        $.ajax({
            url: "http://localhost:3000/moede",
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(inputData),
            success: function (result) {
                console.log(result);
                alert('Mødet blev succesfuldt oprettet');
                location.reload();
            }, error:  function(jqXHR,error, errorThrown) {
                console.log(jqXHR.status);
                console.log(error);
                console.log(errorThrown);
                alert('Noget gik desværre galt. Prøv igen.')
            }
            });
    }
});






