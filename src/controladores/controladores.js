const produtos = require('../dataBase/database')

const mostrarProdutos = (req, res) => res.json(produtos);
const fs = require('fs/promises');

const vendaRealizada = async (req, res) => {
    const { produto_id, quantidade } = req.body;
    if(!produto_id || !quantidade) return res.status(400).json({mensagem: "todos os campos são obrigatorios"});

    const produtoComprado = produtos.find(item => item.id === Number(produto_id));
    


    try{
        const vendas = await (await fs.readFile('./src/vendas.json'));
        const vendasJson = JSON.parse(vendas);
        
        
        vendasJson.vendas.push({
            produto: produtoComprado, quantidade
        });
        await fs.writeFile('./src/vendas.json', JSON.stringify(vendasJson));
        return res.status(201).json('Vendas registrada com sucesso.');
    } catch (erro) {
        return res.status(500).json('Erro do servidor');
    }


}

module.exports = {
    mostrarProdutos,
    vendaRealizada
}

