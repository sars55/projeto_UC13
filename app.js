const express = require('express');
const app = express();
const {engine} = require('express-handlebars');

const mysql = require('mysql2');

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));

app.engine('handlebars',engine());
app.set('view engine','handlebars');
app.set('views', './views');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senac',
    port:3306,
    database: 'ecommerce_pc'
});

conexao.connect(function(erro){
    if(erro) {
        console.error(' Erro ao conectar ao banco de dados:',erro);
        return;
    }
    console.log('Conexão com o banco de dados estabelicida com sucesso!');
});



app.get('/', (req,res) =>{
    let sql = 'SELECT * FROM  produtos';
    conexao.query(sql, function (erro, produtos) {
        if(erro) {
            console.error('Erro ao consultar os produtos:', erro);
            res.status(500).send('Erro ao consultar os produtos');
            return;
        }
        res.render('index', {produtos: produtos});
    });
}
);

app.get('/clientes' , (req, res) =>{
    let sql = 'SELECT *FROM clientes';
    conexao.query(sql, function (erro,clientes) {
        if(erro) {
            console.error('Erro ao consultar os clientes:', erro);
            res.status(500).send('Erro ao consultar os clientes');
            return;
        }
        res.render('clientes', {clientes: clientes});
    })
})


app.listen(8080);
