//ultima lectura del radar:

// a01b01c01d01e01f01g01h01|a02b02c02d02e$2f02g02h02|a03b03c03d03e03f03g03h$3|a04b04c04d04e04f04g04h04|a05b05c05d05e$5f05g^5h05|a06b06c06d06e$6f06g06h06| a07b07c07d07e07f07g07h07|a08b08c08d08e08f#8g08h08|

// captura de pantalla del radar:
// 0 0 0 0 0 # 0 0
// 0 0 0 0 0 0 0 0
// 0 0 0 0 $ 0 0 0
// 0 0 0 0 $ 0 ^ 0
// 0 0 0 0 0 0 0 0
// 0 0 0 0 0 0 0 $
// 0 0 0 0 $ 0 0 0
// 0 0 0 0 0 0 0 0

// vemos que es:
//   a b c d e f g h
// 8 0 0 0 0 0 # 0 0
// 7 0 0 0 0 0 0 0 0
// 6 0 0 0 0 $ 0 0 0
// 5 0 0 0 0 $ 0 ^ 0
// 4 0 0 0 0 0 0 0 0
// 3 0 0 0 0 0 0 0 $
// 2 0 0 0 0 $ 0 0 0
// 1 0 0 0 0 0 0 0 0

function parseRadarData(radarData){
    const radarMatrix = Array(8).fill().map(() => Array(8).fill(0));

    const rows = radarData.split("|").filter(row => row.length > 0);
    rows.forEach((row) => {
        for (let i = 0; i < row.length; i += 3) {
            const cell = row.slice(i, i + 3);
            const colNumber = cell[0].charCodeAt(0) - 97;
            const data = cell[1];
            const rowNumber = 8 - parseInt(cell[2]);

            radarMatrix[rowNumber][colNumber] = data;
        }
    });

    return radarMatrix;
}

function printRadarMatrix(matrix){
    console.log("  a b c d e f g h");
    for (let i = 0; i < matrix.length; i++){
        console.log(`${8 - i} ${matrix[i].join(" ")}`);
    }

}
//  curl -X 'POST' \
//   'https://makers-challenge.altscore.ai/v1/s1/e5/actions/perform-turn' \
//   -H 'accept: application/json' \
//   -H 'API-KEY: -' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "action": "radar",
//   "attack_position": null
// }'


//  curl -X 'POST' \
//   'https://makers-challenge.altscore.ai/v1/s1/e5/actions/perform-turn' \
//   -H 'accept: application/json' \
//   -H 'API-KEY: -' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "action": "attack",
//   "attack_position": {
//     "x": "?",
//     "y": 0
//   }
// }'
