$("#loginForm").submit((e)=> {
    e.preventDefault();

    let inputData = $("#loginForm").serialize();

    console.log("input: " + inputData);

    $.ajax({
        url: "http://localhost:3000/login/userlogin",
        data: inputData,
        success: function (result) {
            console.log(result)
        },
        error: function (err) {
            console.log(err.msg);
            alert("Noget gik galt med login - prøv venligst igen...")
        }
    })

})