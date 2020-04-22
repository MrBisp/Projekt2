let user11;

$("#loginForm").submit((e)=> {
    e.preventDefault();

    let inputData = $("#loginForm").serialize();

    console.log("input: " + inputData);

    $.ajax({
        url: "http://localhost:3000/login/userloginWithAuth",
        data: inputData,
        type: "POST",
        success: function (result) {
            if(result.success === false) {
                alert(result.msg);
                console.log("Abe" + result);
            } else if (result.success === true) {
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