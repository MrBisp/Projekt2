import * as kalender from '../modules/kalender.mjs';

//Initaliserer revisorer
let tempRevisorer = [];
for(let i=0; i<revisorer.length; i++){
    tempRevisorer.push(new Revisor(revisorer[i]))
}
revisorer = tempRevisorer;

kalender.initKalender(null, revisorer[0]);

function getData(url){
    return new Promise(resolve => {
        fetch('./' + url)
            .then(
                function(response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                    }

                    // Examine the text in the response
                    response.json().then(function(data) {
                        resolve(data);
                    });
                }
            ).catch(function (e) {
            console.log(e);
        });
    });
    //Inspiration: https://developers.google.com/web/updates/2015/03/introduction-to-fetch
}





//TIlføj eventhandler for måned-knapper, så kalenderen kan opdateres når der vælges en ny måned
var månedknapper = document.getElementsByClassName('månedKnap');
for (var i = 0; i<månedknapper.length; i++){
    månedknapper[i].addEventListener('click', function(){
        console.log('Månedsknap klikket');
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
        nuværendeStarttidspunkt = JSON.parse(e.target.getAttribute('data-start'));
        nuværendeSluttidspunkt = JSON.parse(e.target.getAttribute('data-slut'));
        e.target.classList+= " aktiv";
    }
});
//Når der klikkes på 'Book møde' knappen
document.getElementById('bookMødeSubmit').addEventListener('click', function(e){
    e.preventDefault();
    //Kilde: https://stackoverflow.com/a/1085810
    var valgRevisorElement = document.getElementById('revisorOption');
    var valgRevisor = valgRevisorElement.options[valgRevisorElement.selectedIndex].value;
    var kundenavn = document.getElementById('kundenavn');
    var kommentar = document.getElementById('kommentar');

    //funktionen gemtilLS i validation.js benyttes også når der klikkes.
});

//Når mødelængden ændres
document.getElementById('mødeOption').addEventListener('change', function(e){
    kalender.refresh();
});