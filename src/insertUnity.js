"use strict";

const {v4} = require("uuid");
const AWS = require("aws-sdk")

const insertUnity = async (event) => {
//module.exports.insertUnity = async (event) => {

  const {item: unity} = JSON.parse(event.body);
  const createdAt = new Date().toISOString();
  const id = v4()

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const newUnity = {
    id,
    item: unity,
    createdAt,
    itemStatus: false
  }

  await dynamodb.put({
    TableName: "UnityTable",
    Item: newUnity
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(newUnity),
  };
};


module.exports = {
    handler:insertUnity
}


