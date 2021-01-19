const express = require("express");

const app = express();
const bodyParser = require("body-parser");

// body parser
app.use(bodyParser.urlencoded({ extended: false })); // permitir enviar dados do formulario decodificar
app.use(bodyParser.json());

// Express usar o EJS como View engine
// rotas
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", (req, res) => {

    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});



//
app.post('/salvarpergunta', (req, res) => {
    const { title, description } = req.body;

    console.log(title)
    console.log(description)
});

app.listen(3333, () => {
    console.log("Started run dev");
});