const express = require('express');
const rotas = express();
const { mostrarProdutos, vendaRealizada } = require('./controladores/controladores')

rotas.get('/produtos',mostrarProdutos);
rotas.post('/produtos',vendaRealizada);

module.exports = rotas;