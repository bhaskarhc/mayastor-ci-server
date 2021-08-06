const query = require('../common/query')
const auth = require('../auth/auth')
const axios = require('axios');
require('dotenv').config

module.exports = {
    Get: function () {
        var data = JSON.stringify({
            query: query.TestExecutionData()
        });

        var config = {
            method: 'get',
            url: 'https://xray.cloud.xpand-it.com/api/v1/graphql',
            headers: {
                'Authorization': `Bearer ${process.env.XRAY_API}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios(config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                if (error.response.status == 401) {
                    auth.genToken()
                } else {
                    console.log("unable to query Graphql xray endpoint", error)
                }
            });

    }

}