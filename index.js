const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => console.log('listening on port 3000!'));

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/index.html');
    
});
app.get('/pokemones',async (req,res)=>{
    const poke = await getPokes();
    Promise.all(poke.map(async (p) => {
        return getData(p.url);
        
    })).then(data => {
        console.log(data);
    res.send(data);
    });
});


const getPokes = async () => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=1&limit=150');
    return response.data.results;
}
const getData = async (url) => {
    const response = await axios.get(url);
    return {
        img: response.data.sprites.front_default,
        nombre: response.data.name
    }
}