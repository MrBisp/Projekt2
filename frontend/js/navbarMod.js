//Hent token fra local storage
var token = localStorage.getItem('token');

//Håndterer navigationsbaren afhængig af, om man er logget ind,
//og i så fald hvilken brugertype der er logget ind
$.ajax({
    url: 'http://localhost:3000/user/userByToken/',
    type: "GET",
    //Sæt Authorization-headeren før requesten sendes
    beforeSend: function (request) {
        request.setRequestHeader("Authorization", 'Bearer ' + token);
    },
    //Hvis man er logget ind, håndteres de forskellige brugertyper
    success: function (result) {
        const user = result.user;
        userID = user._id;
        //Revisor
        //Hvis user.type == 1, er det en revisor der er logget ind
        if(user.type == 1) {
            //jQuery's hide-funktion sætter css propertyen 'display' til 'none'
            //Alternativt kunne man have sat denne manuelt, men vi benytter hide() for nemhedens skyld
            $("#loginNav").hide();
            $("#kalenderNav").hide();
            $("#opretBrugerNav").hide();
            $("#opretRevisorNav").hide();
        }
        //Kunde
        else if (user.type == 2) {
            $("#loginNav").hide();
            $("#opretBrugerNav").hide();
            $("#opretRevisorNav").hide();
        }
    },
    //Er man ikke logget ind, skjules de menupunkter som kun skal vises når man er logget ind
    error: function () {
        $("#minSideNav").hide();
        $("#logafNav").hide();
    }

});