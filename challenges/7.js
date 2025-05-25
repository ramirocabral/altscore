import fetch from 'node-fetch';
import cookie from 'cookie';

let cookieString = ''
let message = ''

// get the first cookie
while (true) {
    const response = await fetch("https://makers-challenge.altscore.ai/v1/s1/e8/actions/door", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "Content-type": "application/json",
            "API-KEY": "-",
        },
    });

    const data = await response.json();

    if (data.detail !== 'Siempre es bueno un atajo, pero no en este caso.') {
        // console.log(data);

        const rawSetCookies = response.headers.raw()['set-cookie'];
        
        if (!rawSetCookies || rawSetCookies.length === 0) {
            console.error('No Set-Cookie header found');
            break;
        }

        // parse the last set-cookie header
        const lastSetCookie = rawSetCookies[rawSetCookies.length - 1];

        const parsed = cookie.parse(lastSetCookie);
        const decoded = parseBase64String(parsed.gryffindor);
        // console.log(decoded);
        //append to the message with a space
        message += decoded + ' ';

        if (!parsed.gryffindor) {
            console.error('gryffindor cookie not found');
            break;
        }

        cookieString = `gryffindor=${parsed.gryffindor}`;
        break;
    }
}

while (true) {
    const response = await fetch("https://makers-challenge.altscore.ai/v1/s1/e8/actions/door", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "Content-type": "application/json",
            "API-KEY": "-",
            "cookie": cookieString,
        },
    });

    const data = await response.json();

    const rawSetCookies = response.headers.raw()['set-cookie'];
    
    if (!rawSetCookies || rawSetCookies.length === 0) {
        console.error('No Set-Cookie header found');
        break;
    }

    const lastSetCookie = rawSetCookies[rawSetCookies.length - 1];

    const parsed = cookie.parse(lastSetCookie);

    const decoded = parseBase64String(parsed.gryffindor);
    message += decoded + ' ';

    if (!parsed.gryffindor) {
        console.error('gryffindor cookie not found');
        break;
    }

    cookieString = `gryffindor=${parsed.gryffindor}`;

    await new Promise(resolve => setTimeout(resolve, 1000));
}

function parseBase64String(base64String) {
    const decodedString = Buffer.from(base64String, 'base64').toString('utf8');
    return decodedString;
}

console.log(message);
