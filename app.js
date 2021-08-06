
const auth = require('./auth/auth')
const tests = require('./fetch/getData');
const AllData = require('./globalArray');
const dataService = require('./handler/dataService')
const app = require('./rest/server')

function main() {

    auth.genToken().then(() => {
        // Update testResults for Every 15*minutes (900000)
        updateTestReults()
        setInterval(() => {
            updateTestReults()
        }, 900000);
    }).catch((error) => {
        console.log(error);
    });
}

function updateTestReults() {
    tests.Get().then(r => {
        dataService.sortGetResponse(r)
    })
    .catch(function (error) {
        console.log("\t Error : ",error);
    });
}


main();