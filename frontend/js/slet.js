function sletmoede() {

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