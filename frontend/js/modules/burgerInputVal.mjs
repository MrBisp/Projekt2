function validation (inputData) {
    let inputValidater = true;
    //Fornavn
    try {
        if(inputData[0].value==null || inputData[0].value=="") throw "Indtast fornavn";
    } catch (err){
        document.getElementById("fejlFornavn").innerHTML = err;
        inputValidater = false;
    }
    //efternavn
    try {
        if(inputData[1].value==null || inputData[1].value=="") throw "Indtast efternavn";
    } catch (err){
        document.getElementById("fejlEfternavn").innerHTML = err;
        inputValidater = false;
    }
    //Email
    try {
        if(inputData[2].value==null || inputData[2].value=="") throw "Indtast Email";
    } catch (err){
        document.getElementById("fejlEmail").innerHTML = err;
        inputValidater = false;
    }
    //SnabelA eller Punktum i email
    try {
        if(inputData[2].value.indexOf("@") < 1 || inputData[2].value.indexOf(".") < 2) throw "Indtast en gyldig Email";
    } catch (err){
        document.getElementById("fejlEmail").innerHTML = err;
        inputValidater = false;
    }
    //Tlf nummer
    try {
        if(inputData[4].value==null || inputData[4].value=="" || inputData[4].value<=10000000 || inputData[4].value>=1000000000) throw "Indtast et gyldigt tlf nr.";
    } catch (err){
        document.getElementById("fejlTlf").innerHTML = err;
        inputValidater = false;
    }
    //Password
    try {
        if(inputData[5].value == null || inputData[5].value =="") throw "Indtast et kodeord";
    } catch (err){
        document.getElementById("fejlKodeord").innerHTML = err;
        inputValidater = false;
    }
    //Username
    try {
        if(inputData[4].value == null || inputData[4].value == "") throw "Indtast et brugernavn";
    } catch (err){
        document.getElementById("fejlBrugernavn").innerHTML = err;
        inputValidater = false;
    }
    return inputValidater;
}

export {validation};