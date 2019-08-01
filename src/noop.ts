import { APIGatewayProxyHandler } from 'aws-lambda';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const lumigo = require('@lumigo/node-tracer')({
    token: process.env.LUMIGO_TOKEN
});

const noop: APIGatewayProxyHandler = async function() {
    console.log('Running noop');
    console.log(process.env.MESSAGE || 'please set the environment variable MESSAGE');
    return {
        statusCode: 200,
        body: 'OK'
    }
}

export const handler = lumigo.trace(noop);