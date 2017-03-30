'use strict';

// A FEW MODULES


let fs = require('fs'),
    _ = require('lodash'),
    mongojs = require('mongojs'),
    colors = require('colors'),
    express = require('express'),
    curry = require('lodash/curry'),
    app = express(),
    bodyParser = require('body-parser'),
    https = require('https'),
    http = require('http'),
    Twitter = require('twitter'),
    request = require('request'),
    querystring = require('querystring'),
    cookieParser = require('cookie-parser'),
    jsonfile = require('jsonfile'),
    Client = require('node-rest-client').Client,
    client = new Client(),
    uuid = require('node-uuid'),
    AWS = require('aws-sdk');

AWS.config = new AWS.Config();
AWS.config.region = "us-west-2";
AWS.config.accessKeyId = "AKIAIHA47RBSKTROB182";
AWS.config.secretAccessKey = "a254dpHU2nHHERjnBxultRMc2BaAfbKl8LrR/182";
let awsBox = {
    author: 'bcarr',
    credsTable: '_jd_creds',
    dumpTable: '_jd_datapump',
    qaTable: '_qa_tools',
    sqsUrl: {
        v1: 'https://sqs.us-west-2.amazonaws.com/787458101211/awseb-e-g9hhe522ki-stack-AWSEBWorkerQueue-1FK5VMUUMIYF8'
    },
    s3Bucket: 'jd-pump',
    apiKey: '',
    isDupe: false
};

let params, s3 = new AWS.S3(),
    tableName = '_projectDojo',
    dynamodb = new AWS.DynamoDB(),
    docClient = new AWS.DynamoDB.DocumentClient();


const _L = (x) => console.log(x);

app.set('port', (process.env.PORT || 8000));

app.use(express.static('static'))
    .use('/bower_components', express.static(__dirname + '/bower_components'))
    .use('/node_modules', express.static(__dirname + '/node_modules')).use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))

app.listen(app.get('port'), function() {

    _L('\n');
    _L('********************************************'.black.bgWhite);
    _L("The frontend server is running on port 8000!".black.bgWhite);
    _L('********************************************'.black.bgWhite);
    _L('\n');

});

app.get('/', function(req, res) {

    _L('\n');
    _L('******* INCOMING GET: Load INITIAL Template *******'.black.bgWhite);
    _L('\n');

    var html = fs.readFileSync('static/views/qa.html');
    res.end(html);

});

app.post('/send-data', function(req, res) {

    _L('\n');
    _L('******* INCOMING GET: send-data *******'.black.bgWhite);
    _L('\n');

    console.log('send-data: ');
    console.log('\n');
    console.log(`Current Time: \n${new Date()}\n`);
    console.log(`Data: \n${ JSON.stringify(req.body, null, 2)}\n`);
    console.log('\n');

    res.json(req.body);

    let deviceMessage = {
        deviceID: req.body.deviceID,
        timeStamp: Number(req.body.timeStamp),
        insertionTime: Number(req.body.insertionTime),
        provider: req.body.provider,
        deviceMessage: req.body.deviceMessage,
        position: req.body.position,
        eventType: req.body.eventType,
        messageType: req.body.messageType,
        metadata: req.body.metadata,
    };

    // deviceLat: req.body.deviceLat,
    // deviceLng: req.body.deviceLng,

    params = {
        TableName: awsBox.qaTable,
        Item: deviceMessage
    };

    docClient.put(params, (err, data) => {
        if (err) {
            console.log("Unable to add key - Error JSON:", JSON.stringify(err, null, 2));
        }
        else {
            console.log(`Successfully uploaded stats to statsTable - ${awsBox.qaTable}`);
            console.log('\n');
        }
    });

});
