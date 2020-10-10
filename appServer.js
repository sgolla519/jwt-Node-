var exp = require('express');

var bodyParser = require('body-parser');

var db = require('./db/config');





var app = exp();


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(require('./api/routes/index'));


function sample(req, res, next){

    req.name = "Srinivas";

    next();
}

app.use(sample);


app.get('/', (req, res) =>{

let result = req.name;

res.send(result)

})




app.listen(3000, ()=>{
    console.log("sever running port: 3000");
})