import * as utils from './modules/utils.mjs';

//Kaldes når kundeformen submittes
$("#opretBrugerForm").submit((e) => {
    e.preventDefault();

    let inputData = $("#opretBrugerForm").serialize();

    //Reset fejlbeskeder
    $(".fejlbesked").text("");

    $.ajax({
        url: "http://localhost:3000/user/kunde",
        type: "post",
        dataType: "json",
        data: inputData,
        //Refresh og giv brugeren besked når kunden er oprettet
        success: function (result) {
            console.log(result);
            alert("Brugeren er nu oprettet");
            location.reload();
        },
        //Når der er fejl, outputtes fejlbeskederne i de rette html-elementer
        error: function (error) {
            console.log(error);
            console.log(error.responseJSON.errors);
            //Gem først fejlbeskederne i variablen 'e'
            let e = error.responseJSON.errors;
            //Loop gennem fejlbeskederne
            for (let field in e) {
                //Field er lig name for inputfelt med fejl
                console.log(field);
                //ALle inputfields har et tilhørende html-element med id 'fejl' + field
                $("#fejl" + field).text("Du har ikke indtastet " + field + " korrekt!");
                //Hvis privatkunde og/eller erhvervskunde giver fejl, gives fejlbesked i html-elementet #fejlkundetype
                if(field == "privatKunde" || field == "erhvervsKunde") {
                    $("#fejlkundetype").text("Du har ikke indtastet kundetype korrekt!");
                }
            }
        }});
});

//Kaldes når revisorformen submittes
$("#opretRevisorForm").submit((e) => {
    e.preventDefault();

    let inputData = $("#opretRevisorForm").serialize();
    console.log(inputData);

    $.ajax({
        url: "http://localhost:3000/user/revisor",
        type: "post",
        dataType: "json",
        data: inputData,
        success: function (result) {
            if (result.username && result.type && result.navn.length) {
                alert("Brugeren er nu oprettet");
                location.reload();
            }
        },
        //For forklaring, se $("#opretBrugerForm").submit
        //Eneste forskel er at der ikke er privat- og erhvervskunde
        error: function (error) {
            console.log(error.responseJSON.errors);
            let e = error.responseJSON.errors;
            for (let field in e) {
                console.log(field);
                $("#fejl" + field).text("Du har ikke indtastet " + field + " korrekt!");
            }
        }
})});