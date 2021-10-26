"use strict";

const AWS = require("aws-sdk")

const updateUnity = async (event) => {

  const {itemStatus: unityStatus} = JSON.parse(event.body);
  const {id} = event.pathParameters

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  await dynamodb.update({
    TableName: "UnityTable",
    Key: {id},
    UpdateExpression: 'set itemStatus = :itemStatus',
    ExpressionAttributeValues: {
      ':itemStatus': unityStatus
    },
    ReturnValues: "ALL_NEW"
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(
      { msg: 'Unity updated'}
    ),
  };
};


module.exports = {
    handler:updateUnity
}


