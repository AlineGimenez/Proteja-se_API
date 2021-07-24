const express = require('express');  // import express;
const server = express();
const cors = require('cors');
const { uuid } = require('uuidv4');

server.use(cors())
server.use(express.json())

server.get('/', async function (request, response) {
    response.json("HELLO WORLD");
})

server.listen(process.env.PORT || 3000);