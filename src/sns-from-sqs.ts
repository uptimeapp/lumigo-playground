import { SQSHandler, SQSEvent } from 'aws-lambda';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const lumigo = require('@lumigo/node-tracer')({
    token: process.env.LUMIGO_TOKEN
});

const logEvent = async function (event: any) {
    console.log(`-----LOG EVENT-----`)
    console.log(JSON.stringify(event, null, 4));
}

const lumigoFn = lumigo.trace(logEvent);

export const handler: SQSHandler = async function(event: SQSEvent, context) {
    console.log(JSON.stringify(event, null, 4));
    const snsEvents = event.Records.map(record => JSON.parse(record.body))
    console.log(`-----SNS EVENT-----`);
    for( var i =0; i < snsEvents.length; i++) {
        await lumigoFn(snsEvents[i], context);
    }

    console.log('complete');
}