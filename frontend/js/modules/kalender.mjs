const månedNavne = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August',
    'September', 'Oktober', 'November', 'December'];
const ugedage = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];
const måned = new Date();

let møderDenneMåned = [];
let mødeLængde = 0;
let tiderPåDagen = [];

let visKalenderFor = null;


export function initKalender(revisor){
    //Hvis vi er inde på en side med kalenderen, skal denne initialiseres.
    //Ellers oprettes Kalender-objektet bare

    visKalenderFor = revisor;

    if(document.querySelector('.dage') != null){
        //Ryd kalenderen
        document.querySelector('.dage').innerHTML = '';
        document.getElementById('tidsplan').style.display = 'none';
        document.getElementById('opretMødeContainer').style.display = 'none';

        //Udskriver hvilken måned og år vi befinder os i
        document.getElementById('år').innerText =  måned.getFullYear();
        document.getElementById('månedNavn').innerText = månedNavne[måned.getMonth()];

        //Finder første ugedag i den givende måned
        //Da getDay() angiver søndag som den 0. dag i ugen, sætter vi førsteDagIMåneden til 7, hvis det er en søndag
        //Source: https://stackoverflow.com/questions/13571700/get-first-and-last-date-of-current-month-with-javascript-or-jquery
        var førsteDagIMåneden = new Date(måned.getFullYear(), måned.getMonth(), 1).getDay();
        if(førsteDagIMåneden == 0) førsteDagIMåneden = 7;

        //Antal dage i måneden. Fungerer ved at tage den 0. dag i den næste måned, som er den sidste dag i denne måned
        //Inspiration: https://stackoverflow.com/a/1184359
        var antalDageIMåneden = new Date(måned.getFullYear(), måned.getMonth() + 1, 0).getDate();

        //Finder html-elementet som indeholder alle dagene, så vi kan tilføje de enkelte dage til dette element
        var dage = document.querySelector('.dage');

        //Gå gennem alle dage i måneden (og opret også elementer på de dage før d. første dag i måneden)
        for(var i=1; i<antalDageIMåneden + førsteDagIMåneden; i++) {

            //Opretter et html-element til at repræsentere hver dag i måneden
            //Kilde: https://www.w3schools.com/js/js_htmldom_nodes.asp
            var dag = document.createElement('div');
            dag.className = 'dag';

            //Hvis dagen er i måneden, udskrives datoen i elementet
            if (i >= førsteDagIMåneden) {
                dag.innerHTML = i - førsteDagIMåneden + 1;
                dag.className += ' iMåneden ' + 'dag' + (i - førsteDagIMåneden + 1);
            } else {
                dag.className += ' ikkeImåneden';
            }

            //Tilføj det nye element til html-elementet med id: dage
            dage.appendChild(dag);
        }

        //Hent data for dagene, og formatér kalenderen ud fra dette
        hentDataForUgedage(revisor);
    }
}

export function getDageIMåneden(){
    return new Date(måned.getFullYear(), måned.getMonth() + 1, 0).getDate();
}
export function getFørsteDagIMåneden(){
    return new Date(måned.getFullYear(), måned.getMonth(), 1).getDay();
}

//Hent data for dagene, og formatér kalenderen ud fra dette
//Altså hvilke ugedage der er optaget, og hvilke der er ledige
export function hentDataForUgedage(revisor) {

    //Find dage med ledige tider, og giv den classen 'ledig' og 'optaget'
    var revisorMøder = revisor.getMøder();
    //console.log(revisorMøder[0].getStartTid());
    møderDenneMåned = [];

    //Gennemgå møder
    for(var i=0; i<revisorMøder.length; i++) {

        //Filtrér først alle de møder fra, som ikke er i den måned vi kigger på
        if (revisorMøder[i].getStartTid().getMonth() == måned.getMonth()) {
            møderDenneMåned.push(revisorMøder[i]);
        }
    }

    //Gennemgå møder denne måned, og formater dem, efter om de er ledige eller optaget eller weekend
    for (var i=1; i<getDageIMåneden() + 1; i++){
        var dato = document.getElementsByClassName('dag' + i)[0];
        var elementDato = new Date(måned.getFullYear(), måned.getMonth(), dato.innerText);

        //Få antallet af ledige tider denne måned, så datoerne i kalenderen kan formateres
        var antalLedigeTider = findMøderForDag(dato, true);

        if(getUgedag(i) == 'Lørdag' ||  getUgedag(i) == 'Søndag'){
            dato.classList += ' weekend';
        } else if(antalLedigeTider == 0){
            dato.classList += ' optaget';
        } else if(antalLedigeTider > 0){
            dato.classList += ' ledig';
        }
    }
}


//Opdater måneden når der trykkes på en af pilene til at skifte måned
export function opdaterMåned(m){
    //Set måneden til den nuværende måned +/- 1 afhængig af hvilken pil der er trykket på
    måned.setMonth(m);

    //Kald initKalender igen, så kalenderen intitialiseres med den nye måned
    refresh();
}

//Set måneden til den nuværende måned +/- 1 afhængig af hvilken pil der er trykket på
export function opdaterÅr(difference){
    måned.setFullYear(måned.getFullYear() + difference);

    //Kald initKalender igen, så kalenderen intitialiseres med den nye måned og nulstiller tidspslan med mere
    refresh();
}

//Find ud af, om dagen er helt fyldt op med møder, eller ej
//Første argument, element, referer til det element, som trykkes på, som vil være .dag (som er en dato)
//Hvis andet argument er false, retuneres ingenting, og så vil funktionen blot finde de ledige mødetider, så de kan outputtes på skærmen
//Hvis andet argument er true, retuneres antallet af ledige mødetider, så vi fx kan formatere dagen i kalenderen, hvis
//der ikke er flere ledige mødetider.
export function findMøderForDag (element, returnResult = false){
    //Opret et Date objekt for den dato der trykkes på
    var elementDato = new Date(måned.getFullYear(), måned.getMonth(), element.innerText);

    //bestem nuværende dag og ugedag
    var dag = element.innerText;
    var ugedag = ugedage[elementDato.getDay()];


    var tiderContainer = document.getElementById('tiderContainer');

    //Hent brugerens valgte mødelængde
    mødeLængde = Number(document.getElementById('mødeOption').value);

    //Nulstil tiderContaineren (oversigten overledige tider)
    tiderContainer.innerHTML = '';

    //Vis ugedag på siden
    document.getElementById('tidsplanUgedag').innerText = ugedag;

    //Vis dato (dag) på siden
    document.getElementById('tidsplanDato').innerText = elementDato.getDate() + '. ' +
        månedNavne[elementDato.getMonth()] + ' ' + elementDato.getFullYear();

    //tiderPåDagen er den variabel vi bruger, til at oprette alle potentielle tider på en bestemt dag
    //Vælger man eksempelvis en mødelængde på 30 minutter, vil denne variabel indeholde alle tider
    //som går fra starten af dagen (fx klokken 08:00), indtil slut på dagen (fx klokken 16:00)
    //I dette tilfælde vil det være 08:00 - 08:30, 08:30 - 09:00 ... osv indtil 15:30 - 16:00.
    tiderPåDagen = [];
    for(var i=visKalenderFor.getStartdag(); i<visKalenderFor.getSlutdag(); i += mødeLængde){
        var dagen = new Date(måned.getFullYear(), måned.getMonth(), dag);
        var minutter = (i % 1);
        if(minutter == 0.5) minutter = 30;
        tiderPåDagen.push(new Date(dagen.getFullYear(), dagen.getMonth(), dagen.getDate(), Math.floor(i), minutter));
    }

    //Gennemgå de møder der er, og find frem til alle de tider der er ledige
    for(var i=0; i<møderDenneMåned.length; i++){
        //Gennemgå de tider der er i dag
        if(møderDenneMåned[i].getStartTid().getDate() == dag) {
            //Fjern de tider, som allerede er optaget
            for (var j = 0; j < tiderPåDagen.length; j++) {

                var starterSammeTidspunkt = (møderDenneMåned[i].getStartTid() - tiderPåDagen[j] == 0);

                //Beregn tiden mellem mødet og tiden på dagen
                var tidMellemMøder = tiderPåDagen[j].getTime() - møderDenneMåned[i].getStartTid().getTime();

                if(false){
                    console.log('møder denne måned: ' + møderDenneMåned[i].getStartTid());
                    console.log('Tider på dagen: ' + tiderPåDagen[j]);
                    console.log('Mødelængde: ' + (møderDenneMåned[i].getMødeLængde() * 60 * 60 * 1000));
                    console.log('Tid mellem møder ' + tidMellemMøder);
                }

                //Sletter elementet, hvis den starter på samme tidspunkt som mødet. Inspiration: https://stackoverflow.com/a/5767357
                if(starterSammeTidspunkt) {
                    tiderPåDagen.splice(j, 1);
                    //Vi tæller j en ned, da vi fjerner et element, og vi ellers ville springe et tidspunkt over
                    j--;
                    continue;
                }

                //Her sker magien.
                //Først tjekker den om mødet er før tidPåDagen (Det 'møde' vi har oprettet)
                //Vi behøver ikke tjekke for, om de starter samtidig, da vi allerede har fjernet alle disse møder i if-statementet overfor.
                //Herefter tjekker den om tiden mellem vores møde og tid på dagen er mindre end mødelængden.
                //Fx:
                //Er tid på dagen 08:30, og mødet starter 08:00
                //Her vil vi have TidmellemMøder = 1800000 og Mødelængde = 3600000
                //Her vil TidmellemMøder være mindre end Mødelængde
                //Dermed vil if-statementet blive true, og tid på dagen (08:30-09:00) fjernes, da der er et møde her
                if(tidMellemMøder > 0 && tidMellemMøder < (møderDenneMåned[i].getMødeLængde() * 60 * 60 * 1000)) {
                    tiderPåDagen.splice(j, 1);
                    j--;
                    continue;
                }

                //Hvis mødet er  klokken 15:30-16:30, og vi har en tidpådagen fra 15:00 - 16:00, skal tiden på dagen slettes,
                //når mødelængden er på en time.
                //Først bestemmes om mødet starter efter tiden på dagen. Gør det det, regner vi forskellen mellem
                //tid mellem møderne * -1, og den mødelængde der er.
                //I eksemplet ovenfor, vil vi have
                //    mødelængde valgt: 3600000
                //    tidmellem møder: -1800000
                //Dermed giver udtrykket (tidMellemMøder * -1 < (mødeLængde * 60 * 60 * 1000)) kun true i præcis denne type tilfælde
                var mødeStarterEfterTidPåDagen = (tidMellemMøder < 0);
                if(mødeStarterEfterTidPåDagen){
                    if(tidMellemMøder * -1 < (mødeLængde * 60 * 60 * 1000)){
                        tiderPåDagen.splice(j, 1);
                        j--;
                    }
                }

            } // Slut på forloop for tiderPåDagen

        } // Slut på if(møderDenneMåned[i].getStartTid().getDate() == dag)
    } // slut på forloop med møderDenneMåned

    //Debugging
    if(false){
        for(var i=0; i<møderDenneMåned.length; i++){
            if(møderDenneMåned[i].getStartTid().getDate() == dag) {
                for (var j = 0; j < tiderPåDagen.length; j++) {
                    var tidMellemMøder = tiderPåDagen[j].getTime() - møderDenneMåned[i].getStartTid().getTime();
                    console.log('Tider på dagen: ' + tiderPåDagen[j]);
                    console.log('Møde: ' + møderDenneMåned[i].getStartTid());
                    console.log('mødelængde valgt: ' + mødeLængde * 60 * 60 * 1000);
                    console.log('tidmellem møder: ' + tidMellemMøder);

                    var mødeStarterEfterTidMellemMøder = (tidMellemMøder < 0);
                    if(mødeStarterEfterTidMellemMøder){
                        console.log('--');
                        console.log(tidMellemMøder * -1 < (mødeLængde * 60 * 60 * 1000))
                    }
                }
            }
        }
    }


    if(returnResult) {
        return tiderPåDagen.length;
    }
}




export function opdaterTidsplan(element){

    //Gør tidsplanen synlig
    document.getElementById('tidsplan').style.display = 'flex';
    document.getElementById('opretMødeContainer').style.display = 'none';

    //Vis de ledige mødetider i tidsplanen for den dag der er trykket på
    findMøderForDag(element);

    //Output de ledige tider
    for(var i=0; i<tiderPåDagen.length; i++){

        //Bestem start- og sluttidspunkt
        var startTidspunkt = tilToTal(tiderPåDagen[i].getHours()) + ':' + tilToTal(tiderPåDagen[i].getMinutes());
        var slutDate = new Date(tiderPåDagen[i].getTime() + (mødeLængde * 60 * 60 * 1000));
        var slutTidspunkt = tilToTal(slutDate.getHours()) + ':' + tilToTal(slutDate.getMinutes());

        //lav et nyt element ud fra de rette oplysninger, og læg det ind i DOM'en
        var tidspunkt = document.createElement('span');
        tidspunkt.className = 'tidspunkt';
        tidspunkt.dataset.start = JSON.stringify(new Date(tiderPåDagen[i]));
        tidspunkt.dataset.slut = JSON.stringify(slutDate);
        tidspunkt.innerHTML = startTidspunkt + ' - ' + slutTidspunkt;
        document.getElementById('tiderContainer').appendChild(tidspunkt);
    }
}

//Sørger for der er 2 tal i et tal, så der fx står 08:00 i stedet for 8:0
export function tilToTal(t){
    //Er tallet med ét ciffer, lægges et nul til før tallet, ellers returneres tallet.
    if(t.toString().length == 1){
        return '0' + t;
    } else {
        return t;
    }
}

//Retunerer en ugedag ud fra en dato
export function getUgedag(dato){
    var midlertidigDato = new Date(måned.getFullYear(), måned.getMonth(), dato);
    //getDay returnerer indexet på ugendagen, hvilket bruges i arrayen ugedage, til at få navnet på dansk
    return ugedage[midlertidigDato.getDay()];
}

export function setVisKalenderFor(revisor){
    visKalenderFor = revisor;
}

export function refresh(){

    //Ryd kalenderen
    document.querySelector('.dage').innerHTML = '';

    document.getElementById('tidsplan').style.display = 'none';
    document.getElementById('opretMødeContainer').style.display = 'none';

    //Kald initKalender igen, så kalenderen intitialiseres med den nye måned
    initKalender(visKalenderFor);
}