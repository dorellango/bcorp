const AWS = require('aws-sdk')

const config = process.env.STAGE === 'local' ? {
  apiVersion: '2012-08-10',
  endpoint: 'http://localhost:8000',
} : null

module.exports = new AWS.DynamoDB.DocumentClient(config);