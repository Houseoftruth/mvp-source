'use strict';
const AWS =  require('aws-sdk')
AWS.config.update({ region: "eu-central-1"});


exports.hello = async (event, context, callback)=> {

  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08",region: "eu-central-1"});
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-central-1"});

  const params = {
    TableName: "mvp-db",
    Item: {
      date: Date.now(),
      message: "Bob"
    }
  }
  
var tableParams = {
  AttributeDefinitions: [
    {
      AttributeName: 'slotPosition',
      AttributeType: 'N'
    },
    {
      AttributeName: 'imageFile',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'slotPosition',
      KeyType: 'HASH'
    },
    {
      AttributeName: 'imageFile',
      KeyType: 'RANGE'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  TableName: 'TABLE_NAME',
  StreamSpecification: {
    StreamEnabled: false
  }
};
  try {
    const data = await documentClient.put(params).promise();
    const dota  = await ddb.createTable(tableParams).promise()

    console.log(data);
    console.log(dota)
  } catch (err) {
    console.log(err);
  }
  
console.log("BEFORE DOCLIENT")
/*
dynamo.put(params,function(err,data){
  console.log("AFTER DOCLIENT")
  if(err){
    callback(err,null)
  }else{    console.log("error")

  console.log("sccess")

   callback(null,data)
  }

})
*/
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
