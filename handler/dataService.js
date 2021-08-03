const AllData = require("../globalArray");

function sortGetResponse(resBody) {
    let eArry = []
    let testCase = {
        id: Number,
        status: String,
        testType: String,
    }
    let issueStruct = {
        id: Number,
        status: String,
        totalTests: Number,
        tests: [testCase],
    }
    let qResults = resBody.data.getTestExecutions.results
    qResults.forEach(issue => {
        issueStruct = {
            id: issue.issueId,
            tests: getTestCase(issue),
            totalTests: issue.tests.results.length,
            status: (function () {
                let filter = issue.tests.results.filter(T => T.status.name != 'PASSED')
                if (filter.length != 0) {
                    return "FAILED"
                }
                return "PASSED"
            })()
        }
        // eArry.push(issueStruct)
        let check = AllData.filter(existing => existing.id == issueStruct.id).length
        if (!check) {
            AllData.push(issueStruct)
        }
    });
}

function getTestCase(issue) {
    let testCaseArray = new Array()
    issue.tests.results.forEach(test => {
        testCase = {
            id: test.issueId,
            testType: test.testType.name,
            status: test.status.name,
        }
        testCaseArray.push(testCase)
    })
    return testCaseArray
}

module.exports = { sortGetResponse }