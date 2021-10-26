"use strict";
const AWS = require("aws-sdk");

const fetchUnity = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const {id} = event.pathParameters

    let unity;

    try {
        const result = await dynamodb.get({
            TableName: "UnityTable",
            Key: {id}
        }).promise();

        unity = result.Item;

    } catch (error) {
        console.log(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(unity),
    };
};

module.exports = {
    handler: fetchUnity,
};
