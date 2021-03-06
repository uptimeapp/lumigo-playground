/* eslint-disable @typescript-eslint/no-var-requires */
import { APIGatewayProxyHandler } from 'aws-lambda';
import uuid = require('uuid');
import { SNS } from 'aws-sdk';

const moment = require('moment');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const lumigo = require('@lumigo/node-tracer')({
    token: process.env.LUMIGO_TOKEN
});


const snsHandler: APIGatewayProxyHandler = async function() {
    console.log('Running sns')
    const id = uuid.v4();
    const time = moment().format('MMMM Do YYYY, h:mm:ss a');
    const message = {
        id,
        time
    };
    await sendMessage(message);
    return {
        statusCode: 200,
        body: JSON.stringify(message)
    };
}

async function sendMessage(message: any) {
    const sns = new SNS();
    const topic = process.env.SNS_TOPIC_ARN;
    const params = {            
        Message: JSON.stringify(message),
        TopicArn: topic,
        MessageAttributes: {}                
    };
    return sns.publish(params)
        .promise();
}


export const handler = lumigo.trace(snsHandler);