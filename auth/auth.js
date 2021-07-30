const axios = require('axios');
const GraphQL = require('./cred')
require('dotenv').config

function genToken() {

    let data = JSON.stringify({ "client_id": GraphQL.clientId, "client_secret": GraphQL.clientSecret });
    let config = {
        method: 'post',
        url: GraphQL.XrayAPI,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return axios(config)
        .then((response) => {
            process.env['XRAY_API'] = response.data
            console.info("Xray Token generated successfully")
            return response.data
        })
        .catch((error) => {
            console.error("Unable to generate Xray token \t", error);
        });
}

module.exports = { genToken }