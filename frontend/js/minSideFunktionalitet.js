//Sletter et møde i databasen når kunden vælger 'Slet møde'
function sletmoede(e) {
    var id = e.getAttribute('data-id');

    //Hvis kunden har trykket slet ved en fejl, hopper vi ud af funktionen.
    let con = confirm ("Er du sikker på, at du vil slette mødet?");
    if (!con) return;
    //Looper gennem alle møder, og finder den som har det ID som vi ønsker at slette

    //Laver DELETE request
    $.ajax({
        type: 'DELETE',
        url: "http://localhost:3000/moede/" + id  })
        .done(function(resultMoeder) {
            alert ("Mødet er blevet slettet");
            location.reload();
        });

}

//Når revisoren godkender mødet, kaldes denne funktion, hvilken laver et PUT request til databasen
//Der tages ingen inputdata, da approve altid skal ændres fra false -> true
function approveMoede (moedeId) {
    var id = moedeId.getAttribute('data-id');
    console.log(id);
    $.ajax({url: "http://localhost:3000/moede/approve/" + id,
        type: "PUT",
        success: (result) => {
            console.log(result);
            location.reload();
        }
    });
}