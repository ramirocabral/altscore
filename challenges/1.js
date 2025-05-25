const response = await fetch("https://makers-challenge.altscore.ai/v1/s1/e1/solution", {
    method: "POST",
    headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        "API-KEY": "-",
    },
    body: JSON.stringify({
        speed: 0,
    })
});

const data = await response.json();
console.log(data);
