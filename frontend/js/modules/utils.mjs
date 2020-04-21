const konverterDatoer = true;

//Tager et objekt som argument og returnerer det efter det er instansieret i Revisor-klassen
export function formaterRevisor(revisorer) {
    let alleRevisorer = [];
    for(let i=0; i<revisorer.length; i++){

        //Vi starter med at formatere møderne  for den enkelte kunde
        let moeder = formaterMoeder(revisorer[i].moeder);

        revisorer[i].moeder = moeder;

        //Inspiration: https://stackoverflow.com/a/4743038
        var r = new Revisor();

        //Bruger jquery extend så der kan bruges et objekt som 'constructor'
        $.extend(r, revisorer[i]);
        alleRevisorer.push(r);
    }
    return alleRevisorer;
}

//Tager et objekt som argument og returnerer det efter det er instansieret i Møde-klassen
export function formaterMoederRevisor (m) {
    //Inspiration: https://stackoverflow.com/a/4743044
    let moeder = [];
    for (let i=0; i<m.length; i++){
        let moede = new Møde();
        if(konverterDatoer){
            m[i].startTime = new Date(m[i].startTime);
            m[i].endTime = new Date(m[i].endTime);
        }
        $.extend(moede, m[i]);

        moeder.push(moede);

        m.kunde = formaterKundeObj2(m.kunde);

    }
    return moeder;
}

export function formaterKunder (data) {
    let alleKunder = [];
    for(let i=0; i<data.length; i++){

        //Vi starter med at formatere møderne  for den enkelte kunde
        let moeder = formaterMoeder(data[i].moeder);

        data[i].moeder = moeder;

        //Inspiration: https://stackoverflow.com/a/4743038
        var k = new Kunde();

        //Bruger jquery extend så der kan bruges et objekt som 'constructor'
        $.extend(k, data[i]);

        alleKunder.push(k);
    }
    return alleKunder;
}

export function formaterKundeObj (data) {
    //Vi starter med at formatere møderne  for den enkelte kunde
    let moeder = formaterMoederKunde(data.moeder);

    data.moeder = moeder;

    //Inspiration: https://stackoverflow.com/a/4743038
    var k = new Kunde();

    //Bruger jquery extend så der kan bruges et objekt som 'constructor'
    $.extend(k, data);

    return k
}

function formaterKundeObj2 (data) {

    //Inspiration: https://stackoverflow.com/a/4743038
    var k = new Kunde();

    //Bruger jquery extend så der kan bruges et objekt som 'constructor'
    $.extend(k, data);

    return k
}

export function formaterRevisorObj (data) {

    let moeder = formaterMoederRevisor(data.moeder);

    data.moeder = moeder;

    //Inspiration: https://stackoverflow.com/a/4743038
    var r = new Revisor();

    //Bruger jquery extend så der kan bruges et objekt som 'constructor'
    $.extend(r, data);

    return r

}