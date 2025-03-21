const express = require('express');
const path = require('path');
const app = express();

// Define o diretório para os arquivos estáticos (como HTML, CSS, JavaScript, imagens)
app.use(express.static('public'));

// Define a rota raiz para servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia o servidor na porta 63342
const server = app.listen(63342, () => {
    console.log('Servidor iniciado em http://localhost:63342');
});
