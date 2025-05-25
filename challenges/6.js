const BASE_URL = 'https://pokeapi.co/api/v2'

async function getPokemonTypes(){
    const url = `${BASE_URL}/type?offset=0&limit=100`
    const response = await fetch(url)
    const data = await response.json()

    return data.results.map(type => (
        {
            name: type.name,
            url: type.url
        }
    ))
}

async function getTypesPokemons(types){
    let pokemons = []
    for (const type of types){
        const url = type.url
        const response = await fetch(url)
        const data = await response.json()
        if (data.pokemon.length === 0){
            continue
        }
        pokemons.push({
            name: type.name,
            url: type.url,
            pokemons: data.pokemon.map(pokemon => (
                {
                    name: pokemon.pokemon.name,
                    url: pokemon.pokemon.url
                }
            ))
        })
    }
    return pokemons
}

async function getTypeAverageHeight(type){
    let totalHeight = 0
    let totalPokemons = 0
    for (const pokemon of type.pokemons){
        const url = pokemon.url
        const response = await fetch(url)
        const data = await response.json()
        const height = data.height
        totalHeight += height
        totalPokemons++
        await new Promise(resolve => setTimeout(resolve, 100))
    }
    const avgHeight = totalHeight / totalPokemons
    return avgHeight
}

const types = await getPokemonTypes()
const pokemons = await getTypesPokemons(types)


let heights = {}
for (const type of pokemons){
    const avgHeight = await getTypeAverageHeight(type)
    heights[type.name] = avgHeight
}

const sortedHeights = Object.keys(heights)
  .sort()
  .reduce((obj, key) => {
    obj[key] = heights[key]
    return obj
  }, {})

console.log(JSON.stringify({ heights: sortedHeights }, null, 2))


const response = await fetch("https://makers-challenge.altscore.ai/v1/s1/e6/solution", {
    method: "POST",
    headers: {
        "accept": "application/json",
        "Content-type": "application/json",
        "API-KEY": "-",
        },
    body: JSON.stringify({
        heights: sortedHeights,
    },
    null,
    2
    )
});

const data = await response.json()
console.log(data)
