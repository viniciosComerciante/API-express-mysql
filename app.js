const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database.js');

const Filmes = require('./FilmesModel');



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


connection.authenticate()
    .then(()=>{
        console.log('conexão bd feita com sucesso')
    })

    .catch((error)=>{

        console.log(error);
    })


app.get('/filmes', (req,res)=>{

    Filmes.findAll().then((filmes)=>{
        res.send(filmes)
    }).catch((error)=>{
        res.send(error);
    })

})


app.get('/filme/:id', (req, res)=>{
    let id = req.params.id;

    Filmes.findOne({
        where:{
            id: id,
        }
    }).then((filme)=>{
        res.send(filme)
    }).catch((error)=>{
        res.send(error);
    })

})


app.post('/filme', (req, res)=>{

    let {title, duration, year} = req.body;

    Filmes.create({
        title: title,
        duration: duration,
        year: year,
    }).then(()=>{

        res.sendStatus(200);

    })
     
})

app.delete('/filme/:id', (req, res)=>{

    let id = req.params.id;

    if(isNaN(id)){
        res.sendStatus(404)
    }else{
        Filmes.destroy({
            where: {
                id:id
            }
        });
        res.sendStatus(200);
    }
})


app.put('/filme/:id', (req, res)=>{

    let id = req.params.id;

    let {title, duration, year} = req.body;

    if(!isNaN(id)){
        //id é um numero
        if(dateCompleteVerification(title, duration, year)){
            //dados completos
            Filmes.update({title:title, duration:duration, year:year}, {
                where: {
                    id:id
                }
            })
            res.sendStatus(200);
        }else{
            res.sendStatus(400);
        }

    }else{
        //id não é um numero
        res.sendStatus(400);
    }

    function dateCompleteVerification(title, duration, year){
        return (title!=undefined && duration!=undefined  && year!=undefined ) ? true : false;
    }

})


app.listen(80, ()=>{
    console.log('server rodando na porta 80');
})

