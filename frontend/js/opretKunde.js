import * as utils from './modules/utils.mjs';
import {validation} from './modules/burgerInputVal.mjs';

$.ajax({
    url: "http://localhost:3000/user/hentBrugere",
    success: function(result) {
        console.log(result);
        let alleBrugere = utils.formaterKunder(result);
        console.log(alleBrugere);
    }
});



$("#opretBrugerForm").submit((e) => {
    e.preventDefault();

    let inputData = $("#opretBrugerForm").serialize();
   // let inputData2 = $("#opretBrugerForm").serializeArray();
    console.log(inputData);

   // let boolean = validation(inputData2);

    $.ajax({
        url: "http://localhost:3000/user/opretBruger",
        type: "post",
        dataType: "json",
        data: inputData,
        success: function (result) {
            console.log(result);
            alert("Brugeren er nu oprettet");
            location.reload();
        },
        error: function (e) {
            console.log("Fejl: " + e);
            alert("Der er sket en fejl - prøv igen");
        }});

});

