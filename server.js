const express = require('express');  // import express;
const server = express();
const cors = require('cors');
const { uuid } = require('uuidv4');

const database = require('./database');

server.use(cors())
server.use(express.json())

server.get('/', async function (request, response) {
    const resultado = await database.readCredentials();
    response.json(resultado);
})

server.post('/createtag', async function (request, response) {
    const uuid1 = uuid();
    const tag_number = request.body.tag_number;
    const user_name = request.body.user_name;
    const resposta = await database.createTag(uuid1, tag_number, user_name);
    response.status(200).send();
})

server.post('/tagexist', async function (request, response) {
    const tag_number = request.body.tag_number;
    const resultado = await database.tagexist(tag_number);
    if (resultado != null) {
        response.json(resultado);
    }
    else
        response.status(401).send();
})

server.listen(process.env.PORT || 3000);