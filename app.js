
const auth = require('./auth/auth')
const tests = require('./fetch/getData');
const AllData = require('./globalArray');
const dataService = require('./handler/dataService')

function main() {
    auth.genToken().then(() => {
        // Update testResults for Every 15*minutes (900000)
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
    }).then(() =>
        console.log(AllData.length)
    ).catch(function (error) {
        console.log(error);
    });
}

main();