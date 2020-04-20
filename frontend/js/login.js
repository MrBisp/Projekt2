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
                localStorage.setItem('token',result.token);
                //console.log(result);
                if(result.user[0].type === 1) {
                    //Revior
                    window.location.replace("revisorLoginside.html");
                } else if (result.user[0].type === 2) {
                    //kunde
                    window.location.replace("kundeLoginside.html")
                } else {
                    alert("noget gik galt. Kontakt administrator for at få problemet løst.")
                }
            } else {
                alert("Noget gik galt, prøv venligst igen...")
            }
        }
    })

});