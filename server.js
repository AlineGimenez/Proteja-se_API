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
    const privilege = request.body.privilege;
    const resposta = await database.createTag(uuid1, tag_number, user_name, privilege);
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

server.get('/solicitartemperatura', async function (request, response) {
    //API deve solicitar ao ESP32 que colete a temperatura pelo MLX90614
    //Após o ESP32 ter coletado a temperatura, o mesmo deve mandar (bater na API) por um endpoint que salvará em uma variável global a temperatura
    //Enquanto isso o app Flutter deve ficar escutando essa variável
    //Após se encerrar o processo, o ESP32 deve bater na API pedindo que zere as variáveis globais.

    //OU
    //API deve solicitar ao ESP32 que colete a temperatura pelo MLX90614
    //o endpoint deve ficar aguardando uma resposta do MLX90614, no qual o ESP32 deve retornar a temperatura pelo body da requisição da API
    //Porteiormente, esse método deve retornar ao app do Flutter pelo body a temperatura

    response.json("Conexão com a API concluida");

    /*if (resultado != null) {
        response.json(resultado);
    }
    else
        response.status(401).send();*/
})

server.listen(process.env.PORT || 3000);