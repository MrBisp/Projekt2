//Inkluderes i de HTML-filer, hvor man kun må / kan se indholdet, når man er logget ind

//Hent token fra localstorage
var token = localStorage.getItem('token');

//Er man ikke logget ind, sendes man til logindsiden
//Er man logget ind, gøres intet, og i stedet fortsætter man på den side man var på vej til
$.ajax({
    url: 'http://localhost:3000/user/userByToken/',
    type: "GET",
    beforeSend: function (request) {
        request.setRequestHeader("Authorization", 'Bearer ' + token);
    },
    success: function (result) {
        alert('Du er allerede logget ind');
        location.href = 'minSide.html';
    }
});