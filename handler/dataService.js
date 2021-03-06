const { json } = require("body-parser");
const AllData = require("../globalArray");

function sortGetResponse(resBody) {
    let eArry = []
    let testCase = {
        id: Number,
        status: String,
        testType: String,
    }
    let issueStruct = {
        id: String,
        issueId: Number,
        status: String,
        totalTests: Number,
        description: String,
        tests: [testCase],
    }
    let qResults = resBody.data.getTestExecutions.results
    qResults.forEach(issue => {

        let pipe = getTestDetails(issue.jira)
        const genJenkinsLink = ((jira) => {

            let urlRegex = /(https?:\/\/[^ ]*)/;
            let url = jira.description == null ? null : jira.description.match(urlRegex)[1];
            return url
        })(issue.jira)
        issueStruct = {
            issueId: issue.issueId,
            id: issue.jira.key,
            jenkinsLink: genJenkinsLink,
            branch: pipe.branch,
            imageTag: pipe.imageTag,
            tests: getTestCase(issue.testRuns.results)
        }
        let check = AllData.filter(existing => existing.issueId == issueStruct.issueId).length
        if (!check) {
            console.log(`\t \tGot latest test pipline issueId: ${issueStruct.issueId} and ID: ${issueStruct.id}`)
            AllData.push(issueStruct)
        }
    });
}

function getTestCase(tests) {
    let testCaseArray = new Array()
    tests.forEach(test => {
        testCase = {
            id: test.id,
            startedOn: test.startedOn,
            finishedOn: test.finishedOn,
            name: test.unstructured == null ? null : test.unstructured.split('.')[1],
            status: test.results.length == 0 ? null : test.results[0].status.name,
            description: test.unstructured,
        }
        testCaseArray.push(testCase)
    })
    return testCaseArray
}
function getTestDetails(jira) {
    const keys = {
        pipeline: "Pipeline: ",
        testID: "test plan: ",
        branch: "git branch: ",
        imageTag: "tested image tag: "
    }
    let values = keys
    let detailsString = jira.summary
    let str = JSON.stringify(detailsString)
    let arrayData = str.split(",");
    arrayData.forEach(set => {
        if (set.includes(keys.testID)) {
            values.testID = set.replace(keys.testID, "")
        } else if (set.includes(keys.branch)) {
            values.branch = set.replace(keys.branch, "")
        } else if (set.includes(keys.imageTag)) {
            let tag = set.replace(keys.imageTag, "")
            values.imageTag = tag.replace(/[^A-Za-z0-9-]/g, "");
        }
    })
    return values
}
module.exports = { sortGetResponse }