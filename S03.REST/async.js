function exemple() {
    console.log('Début');
    setTimeout(() => {
        console.log('Milieu');
    }, 1500);
    console.log('Fin');
}

function exemple2() {
    console.log('1');
     
    setTimeout(() => {
        console.log('2'); 
        setTimeout(() => {
            console.log('3'); 
            setTimeout(() => {
                console.log('4'); 
            }, 500);
            console.log('5'); 
        }, 1000);
        console.log('6'); 
    }, 1000);

    console.log('7'); 

    setTimeout(() => {
        console.log('8'); 
    }, 1500);

    console.log('9');
}


function exemplePromise() {

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('une seconde');
            reject('Yannick est reject');
        }, 1000);
    })

    promise.then(r => {
        console.log('promesse terminée');
    }).catch(err => {
        console.log(err);
    });

}

async function exempleAsync() {

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('une seconde');
            resolve('promesse terminée');
        }, 1000);
    })

    try {
        let result = await promise;
        console.log(result);
    } catch(err) {
        console.log('catch');
        console.log(err);
    }
}

exempleAsync();

