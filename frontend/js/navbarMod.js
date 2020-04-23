var token = localStorage.getItem('token');
$.ajax({
    url: 'http://localhost:3000/user/userByToken/',
    type: "GET",
    beforeSend: function (request) {
        request.setRequestHeader("Authorization", 'Bearer ' + token);
    },
    success: function (result) {
        const user = result.user;
        userID = user._id;
        //Revisor
        if(user.type == 1) {
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
    error: function () {
        $("#minSideNav").hide();
        $("#logafNav").hide();

    }

});