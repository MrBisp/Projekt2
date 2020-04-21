function sletmoede(e) {

    var id = e.getAttribute('data-id');

    let con = confirm ("Er du sikker på, at du vil slette mødet?");
    if (!con) return;
    //Looper gennem alle møder, og finder den som har det ID som vi ønsker at slette

    $.ajax({
        type: 'DELETE',
        url: "http://localhost:3000/moede/" + id  })
        .done(function(resultMoeder) {
            alert ("Mødet er blevet slettet");
            location.reload();
        });

}

function approveMoede (moedeId) {
    var id = moedeId.getAttribute('data-id');
    console.log(id);
    $.ajax({url: "http://localhost:3000/moede/approve/" + id,
        type: "PUT",
        success: (result) => {
            console.log(result);
            //location.reload();
        }
    });
}