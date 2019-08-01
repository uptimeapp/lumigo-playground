/* eslint-disable @typescript-eslint/no-var-requires */
import { APIGatewayProxyHandler } from 'aws-lambda';
import axios from 'axios';
const LumigoTracer = require('@lumigo/tracer');

const tracer = new LumigoTracer({
    'token': process.env.LUMIGO_TOKEN
});


const clock: APIGatewayProxyHandler = async function() {
    console.log('Running clock')
    const response = await axios.get('http://worldclockapi.com/api/json/utc/now');
    return {
        statusCode: 200,
        body: JSON.stringify(response.data)
    };
}

export const handler = tracer.trace(clock);