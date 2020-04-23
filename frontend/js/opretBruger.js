import * as utils from './modules/utils.mjs';
//import {formaterKunder} from "./modules/utils";
//import {formaterKunder, formaterRevisor} from "./modules/utils";
//import * as format from './modules/utils';

//Denne kan godt blive lavet om, så revisorerne bliver formateret som revisorer og kunder som kunder
$.ajax({
    url: "http://localhost:3000/user/hentBrugere",
    success: function(result) {
        let alleBrugere = [];
        for (let i = 0; i < result.length; i++) {
            if(result[i].type === 1) {
                //Vi har skrevet formater funktionen lidt om, da det kun er et objekt og ikke et array som skal formateres
                let revisor = utils.formaterRevisorObj(result[i]);
                alleBrugere.push(revisor);
            } else if(result[i].type === 2) {
                let kunde = utils.formaterKundeObj(result[i]);
                alleBrugere.push(kunde);
            }
        }
    }
});



$("#opretBrugerForm").submit((e) => {
e.preventDefault();

let inputData = $("#opretBrugerForm").serialize();

$(".fejlbesked").text("");

// let inputData2 = $("#opretBrugerForm").serializeArray();
console.log(inputData);

// let boolean = validation(inputData2);

$.ajax({
    url: "http://localhost:3000/user/opretKunde",
    type: "post",
    dataType: "json",
    data: inputData,
    success: function (result) {
        console.log(result);
        alert("Brugeren er nu oprettet");
        location.reload();
    },
    error: function (error) {
        console.log(error);
        console.log(error.responseJSON.errors);
        let e = error.responseJSON.errors;
        for (let field in e) {
            console.log(field);
            $("#fejl" + field).text("Du har ikke indtastet " + field + " korrekt!");

            if(field == "privatKunde" || field == "erhvervsKunde") {
                $("#fejlkundetype").text("Du har ikke indtastet kundetype korrekt!");
            }
        }
    }});
});


$("#opretRevisorForm").submit((e) => {
    e.preventDefault();

    let inputData = $("#opretRevisorForm").serialize();

    console.log(inputData);

    $.ajax({
        url: "http://localhost:3000/user/opretRevisor",
        type: "post",
        dataType: "json",
        data: inputData,
        success: function (result) {
            if (result.username && result.type && result.navn.length) {
                console.log(result);
                alert("Brugeren er nu oprettet");
                location.reload();
            }
        },
        error: function (error) {
            console.log(error.responseJSON.errors);
            let e = error.responseJSON.errors;
            for (let field in e) {
                console.log(field);
                $("#fejl" + field).text("Du har ikke indtastet " + field + " korrekt!");
            }
        }
})});

/*
else {
    let errorArray = Object.entries(result.msg.errors);
    errorArray.forEach(([key, value]) => {
        if (value.message === "Path `username` is required.") {
            $("#fejlBrugernavn").text("Du har ikke indtastet brugernavnet korrekt!");
        }
        if (value.message === "Path `password` is required.") {
            $("#fejlKodeord").text("Du har ikke indtastet kodeordet korrekt!");
        }
        if (value.message === "Path `email` is required.") {
            $("#fejlEmail").text("Du har ikke indtastet emailen korrekt!");
        }
        if (value.message === "Path `navn` is required.") {
            $("#fejlFornavn").text("Du har ikke indtastet enten fornavn eller efternavn korrekt!");
            $("#fejlEfternavn").text("Du har ikke indtastet enten fornavn eller efternavn korrekt!")
        }
        if (value.message === "Path `tlf` is required.") {
            $("#fejlTlf").text("Du har ikke indtastet telefonnummeret korrekt!");
        }
        if (value.properties.type === "min" || value.properties.type === "max") {
            $("#fejlTlf").text("Du har ikke indtastet et eksisterende telefonnummer!");
        }
    });
}*/