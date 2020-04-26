//Når loginformen submittes
$("#loginForm").submit((e)=> {
    //preventDefault bruges, så siden ikke refreshes automatisk
    e.preventDefault();

    let inputData = $("#loginForm").serialize();

    //POST request til at logge ind
    $.ajax({
        url: "http://localhost:3000/login/userloginWithAuth",
        data: inputData,
        type: "POST",
        success: function (result) {
            if(result.success === false) {
                alert(result.msg);
                console.log( result);
            } else if (result.success === true) {
                //Hvis vi har logget ind korrekt, gemmes token i localstorage
                localStorage.setItem('token',result.token);
                console.log(result);
                //Der tages højde for om hvorvidt brugeren er en kunde eller revisor i 'revisorLoginSide.js'
                window.location.replace("minSide.html");
            } else {
                alert("Noget gik galt, prøv venligst igen...")
            }
        }
    })

});