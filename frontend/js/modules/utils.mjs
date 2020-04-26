const konverterDatoer = true;

//Tager et array af objekter som argument og returnerer det
// efter det er instansieret i Revisor-klassen
export function formaterRevisorArray(revisorer) {
    let alleRevisorer = [];
    for(let i=0; i<revisorer.length; i++){
        //Vi starter med at formatere møderne  for den enkelte kunde
        let moeder = formaterArrayMoederRevisor(revisorer[i].moeder);

        revisorer[i].moeder = moeder;

        //Inspiration: https://stackoverflow.com/a/4743038
        var r = new Revisor();

        //Bruger jquery extend så der kan bruges et objekt som 'constructor'
        $.extend(r, revisorer[i]);
        alleRevisorer.push(r);
    }
    return alleRevisorer;
}

//Tager et array af objecter som argument og returnerer det efter det er instansieret i Møde-klassen
export function formaterArrayMoederRevisor (m) {
    //Inspiration: https://stackoverflow.com/a/4743044
    let moeder = [];
    for (let i=0; i<m.length; i++){
        let moede = new Møde();
        if(konverterDatoer){
            m[i].startTime = new Date(m[i].startTime);
            m[i].endTime = new Date(m[i].endTime);
        }
        m[i].kunde = formaterKundeObj(m[i].kunde, false);

        $.extend(moede, m[i]);

        moeder.push(moede);

    }
    return moeder;
}

export function formaterKundeObj (data, formaterMøder) {
    //Vi starter med at formatere møderne  for den enkelte kunde
    if(formaterMøder){
        let moeder = formaterArrayMoederKunde(data.moeder);
        data.moeder = moeder;
    }

    //Inspiration: https://stackoverflow.com/a/4743038
    var k = new Kunde();

    //Bruger jquery extend så der kan bruges et objekt som 'constructor'
    $.extend(k, data);

    return k
}

export function formaterRevisorObj (data, formaterMøder) {
    if(formaterMøder){
        let moeder = formaterArrayMoederRevisor(data.moeder);
        data.moeder = moeder;
    }
    //Inspiration: https://stackoverflow.com/a/4743038
    var r = new Revisor();
    //Bruger jquery extend så der kan bruges et objekt som 'constructor'
    $.extend(r, data);

    return r

}

export function formaterArrayMoederKunde (m) {
    //Inspiration: https://stackoverflow.com/a/4743044
    let moeder = [];
    for (let i=0; i<m.length; i++){
        let moede = new Møde();
        if(konverterDatoer){
            m[i].startTime = new Date(m[i].startTime);
            m[i].endTime = new Date(m[i].endTime);
        }
        m[i].revisor = formaterRevisorObj(m[i].revisor, false);

        $.extend(moede, m[i]);

        moeder.push(moede);

    }
    return moeder;
}