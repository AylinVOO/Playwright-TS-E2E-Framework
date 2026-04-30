import http from 'k6/http';
import { sleep, check } from 'k6';

// 1. The Config (The load)

export const options = {
    //vus: 10, // virtual users hitting the site at the same time
    //duration: '5s', // How long the test runs for

    stages: [
        { duration: '10s', target: 20 }, // Ramp up to 20 users over 10 seconds
        { duration: '15s', target: 20 }, // Stay at 20 users for 15 seconds
        { duration: '10s', target: 0 },   // Ramp down to 0 users over 10 seconds
    ],
};

// 2. The Execution (The Actions)

export default function ()
{

    //Hitting the familiar Petstore endpoint
    const res = http.get( 'https://petstore.swagger.io/v2/pet/findByStatus?status=available' );

    //The Assertion (The Validation)
    check( res, {
        'status is 200': ( r ) => r.status === 200,
        'transaction time OK': ( r ) => r.timings.duration < 500
    } );

    //Pause for 1 second to simulate real user behavior
    sleep( 1 );
}
