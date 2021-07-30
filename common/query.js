module.exports = {
    GetTestRuns: () => {
        return `{
            getTestRuns(limit: 100 ) {
                total
                limit
                start
                results {
                    id
                    status {
                        name
                        color
                        description
                    }
                    gherkin
                    examples {
                        id
                        status {
                        name
                        color
                        description
                        }
                    }
                    test {
                        issueId
                    }
                    testExecution {
                        issueId
                    }
                }
            }
        }`
    },
    GetTestExecutions:() => {
        return `{
            getTestExecutions(limit: 20) {
                total
                start
                limit
                results {
                    issueId
                    tests(limit: 50) {
                        total
                        start
                        limit
                        results {
                            issueId
                            testType {
                                name
                            }
                            status{name}
                        }
                    }
                }
            }
        }`
    }
}