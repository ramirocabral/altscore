//obtenemos:

// [
//   {
//     id: 'fe05a4b2-9bad-4ea8-95ff-e9c9b258ec2c',
//     resonance: 133,
//     position: {
//       x: 0.577352145256762,
//       y: 0.7045718362149235,
//       z: 0.045824383655662215
//     }
//   },
//   {
//     id: 'fdce2d4c-d1de-44f4-97cd-7926b978a049',
//     resonance: 546,
//     position: {
//       x: 0.5557683234056182,
//       y: 0.718408275296326,
//       z: 0.15479682527406413
//     }
//   },
//   {
//     id: 'fd81715a-992a-4b59-8310-a5f02ed0c167',
//     resonance: 399,
//     position: {
//       x: 0.5175758410355906,
//       y: 0.12100419586826572,
//       z: 0.22469733703155736
//     }
//   }
// ]
// Headers {
//   'x-total-count': '100',
//   'content-type': 'application/json',
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'POST, GET, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'Authorization, Content-Type',
//   'x-cloud-trace-context': '058abc7eb8e910f7ba9a3aba5e7ea16a;o=1',
//   date: 'Fri, 23 May 2025 22:23:29 GMT',
//   server: 'Google Frontend',
//   'content-length': '436'
// }

// aqui vemos que hay 100 elementos en total, pero nos devuelve 3 por request, asi que vamos a la pagina 34:

// const response = await fetch("https://makers-challenge.altscore.ai/v1/s1/e2/resources/stars?page=1", {
//     method: "GET",
//     headers: {
//         "accept": "application/json",
//         "API-KEY": "-",
//         },
//     });
//
// const data = await response.json();
// const headers = response.headers;
// console.log(data);
// console.log(headers)

// obtenemos:
//
// [
//   {
//     id: '00d25618-a4a0-4eed-913b-15ec40eb7234',
//     resonance: 203,
//     position: {
//       x: 0.26774087597570273,
//       y: 0.21098284358632646,
//       z: 0.9429097143350544
//     }
//   }
// ]
// Headers {
//   'x-total-count': '100',
//   'content-type': 'application/json',
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'POST, GET, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'Authorization, Content-Type',
//   'x-cloud-trace-context': '7aa85e999bcdaa6f03dba2dd6b647a8d',
//   date: 'Fri, 23 May 2025 22:26:54 GMT',
//   server: 'Google Frontend',
//   'content-length': '147'
// }
//

// por lo tanto, tenemos 33*3 + 1 = 100 elementos

async function getAverage(){
    let totalResonance = 0;
    let totalStars = 0;
    let pageResonance = 0;
    for (let i = 1; i <= 34; i++){
        const response = await fetch(`https://makers-challenge.altscore.ai/v1/s1/e2/resources/stars?page=${i}&sort-by=resonance&sort-direction=desc`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "API-KEY": "-",
                },
            });

        const data = await response.json();

        pageResonance = 0;
        for (let j = 0; j < data.length; j++){
            pageResonance += data[j].resonance;
        }
        totalResonance += pageResonance;
        totalStars += data.length;

        await new Promise(resolve => setTimeout(resolve, 500));
    }

    const average = totalResonance / totalStars;
    console.log(`Total resonance: ${totalResonance}`);
    console.log(`Total stars: ${totalStars}`);
    console.log(`Average resonance: ${average}`);
}

// getAverage();
