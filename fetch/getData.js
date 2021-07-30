const query = require('../common/query')
const axios = require('axios');
require('dotenv').config

module.exports = {
    Get: function () {
        var data = JSON.stringify({
            query: query.GetTestExecutions()
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
                // console.log(JSON.parse(response.data));
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });

    }

}