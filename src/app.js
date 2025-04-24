import express from 'express';
import ficha from './models/Ficha.js';
import sequelize from './config/dbconnect.js';
import upload from './config/middleware/upload.js';


const app = express();

app.use(express.json());


sequelize.authenticate()
    .then(() => console.log("conexão com mysql feita com sucesso"))
    .catch(err => console.log("erro ao conectar", err));

sequelize.sync()

app.get("/", (req, res) => {
    res.status(200).send("Rpg project rodando com Mysql");

});


app.get("/char", async (req, res) => {
    const listaficha = await ficha.findAll();
    res.status(200).json(listaficha);
});

app.post("/char",upload.fields([
    {name: 'imagem', maxCount: 1},
    {name: 'arquivo', maxCount: 1}
]), async (req, res) => {
    try{
        const novaFicha = await ficha.create({
            nameChar: req.body.nameChar,
            system: req.body.system,
            description: req.body.description,
            file: req.files.arquivo ? req.files.arquivo[0].path : null,
            image: req.files.imagem ? req.files.imagem[0].path : null
            
    });

        res.status(201).json({mensagem: "Ficha criada com sucesso", ficha: novaficha});
    }catch{
        res.status(500).send("Erro ao criar ficha: " + err.message);
    }
   

});

app.get("/char/:id",async (req, res) => {
    const index = await ficha.findByPk(req.params.id);
    if (index){
        res.status(200).json(index)
    } 
   else{
        res.status(404).send("não encontrado");
   }
})



app.put("/char/:id",async (req, res) => {
    const index = await ficha.findByPk(req.params.id);
    if (index){
        await ficha.update(req.body, {
            where: {id: req.params.id}
        });
        res.status(200).send("ficha alterada");
    } 
   else{
        res.status(404).send("erro");
   }
})

app.delete("/char/:id",async (req, res) => {
    const index = await ficha.findByPk(req.params.id);
    if (index){
        await ficha.destroy({
            where: {id: req.params.id}
        });
        res.status(200).send("ficha removida");
    } 
   else{
        res.status(404).send("erro");
   }
})

export default app;

