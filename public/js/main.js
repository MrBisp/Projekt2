function getData(url){
    return new Promise(resolve => {
        fetch('./' + url)
            .then(
                function(response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                    }

                    // Examine the text in the response
                    response.json().then(function(data) {
                        resolve(data);
                    });
                }
            ).catch(function (e) {
            console.log(e);
        });
    });
    //Inspiration: https://developers.google.com/web/updates/2015/03/introduction-to-fetch
}