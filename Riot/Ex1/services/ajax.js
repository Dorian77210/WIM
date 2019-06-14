const URL = 'https://randomuser.me/api';

const makeAjaxService = ( requestType, url ) => {
    return new Promise( ( resolve, reject ) => {
        const ajax = new XMLHttpRequest();
        ajax.onload = () => {
            if(ajax.status == 200) {
                resolve(ajax.response);
            } else {
                reject("Error when querying the server");
            }
        }

        ajax.onerror = () => {
            reject("Network error");
        }

        // setup the properties
        ajax.open( requestType, url );
        ajax.responseType = 'json';

        ajax.send( null );
    } );
}

const serviceAjax = () => {
    return {
        service: {
            url: URL,
            request: makeAjaxService
        }
    };
}