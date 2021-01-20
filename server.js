const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database');
const PerguntaModel = require('./database/Pergunta');

connection.authenticate().then(() => {
    console.log('Conxeão feita com banco de dados')
}).catch(error => {
    console.log(error)
})


// body parser
app.use(bodyParser.urlencoded({ extended: false })); // permitir enviar dados do formulario decodificar
app.use(bodyParser.json());

// Express usar o EJS como View engine
// rotas
app.set('view engine', 'ejs');
app.use(express.static('public'));


//renderizando pagina
app.get("/", async (req, res) => {

    const perguntas = await PerguntaModel.findAll({ raw: true, order: [['id', 'DESC']] });
    console.log(perguntas)
    res.render("index", { perguntas });
});

//renderizando pagina
app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

//salvando banco de dados
app.post('/salvarpergunta', async (req, res) => {
    const { title, description } = req.body;

    await PerguntaModel.create({
        title,
        description
    }).then(() => {
        res.redirect('/');
    });


});

app.get('/pergunta/:id', async (req, res) => {
    var id = req.params.id;
    const pergunta = await PerguntaModel.findOne({ where: { id: id } });
    if (pergunta != undefined) { //pergunta achada
        res.render("pergunta", { pergunta });
    } else { // não encontrada
        res.redirect('/');
    }

    // PerguntaModel.findOne({
    //     where: { id: id }
    // }).then((pergunta) => {
    //     console.log(pergunta)
    //     if (pergunta != undefined) { //pergunta achada
    //         res.render("pergunta");
    //     } else { // não encontrada
    //         res.redirect('/');
    //     }
    // })

});

app.listen(3333, () => {
    console.log("Started run dev");
});