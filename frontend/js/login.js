let user11;

$("#loginForm").submit((e)=> {
    e.preventDefault();

    let inputData = $("#loginForm").serialize();

    console.log("input: " + inputData);

    $.ajax({
        url: "http://localhost:3000/login/userlogin",
        data: inputData,
        success: function (result) {
            if(result.success === false) {
                alert(result.msg);
                console.log(result);
            } else if (result.success === true) {
                //console.log(result);
                if(result.user[0].type === 1) {
                    //Revisor
                    window.location.replace("revisorLoginside.html");
                } else if (result.user[0].type === 2) {
                    //kunde
                } else {
                    alert("noget gik galt. Brugeren med username: " + result.user[0].username + " har ikke angivet nogen brugertype. Kontakt administrator for at få problemet løst." )
                }
            } else {
                alert("Noget gik galt, prøv venligst igen...")
            }
        }
    })

});