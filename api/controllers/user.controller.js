var User = require('../models/user.model');

var jwt = require('jsonwebtoken');

var bcrpt = require('bcryptjs');

var global = require('../../db/secret');


var create = (req, res)=>{

    var hashedPassword = bcrpt.hashSync(req.body.password, 8);

var obj={
    id:req.body.id,
    username:req.body.username,
    password:hashedPassword,
    firstname:req.body.firstname,
    lastname:req.body.lastname
}

User.findOne({id:req.body.id}, (err, user) =>{

    if(user){
        res.status(409).send("User already exists");
    }else{

            User.create(obj, (err, result)=>{
        if(err){
            res.status(500).send("There was a problem registering the user")
        }else{
            var data ={
                id:result.id,
                username:result.username,
                firstname:result.firstname,
                lastname:result.lastname
            }
            res.json({
                status:200,
                data:data,
                message:"User Creatd Successfully"
            })
        }
    })
}
})


}



var login = (req, res) =>{

User.findOne({username:req.body.username}, (err, user) =>{
    console.log("display user details", user);
    if(err) return res.status(500).send("Error on the server");

    if(!user) return res.status(404).send("No User Found");

    var passwordIsValid = bcrpt.compareSync(req.body.password, user.password);

    if(!passwordIsValid) return res.status(401).send({auth: false, token: null})

    var token = jwt.sign({id:user._id}, global.secret, {
        expiresIn:86400 //expire in 4 hours
    });

    console.log("token", token);
    res.status(200).send({auth:true, token:token})
})



}


var verifyToken = (req, res) =>{

console.log("display token ")

    var token = req.headers['x-acess-token'];

    if(!token) return res.status(401).send({auth:false, message:'No Token Provided'});

    jwt.verify(token, global.secret, (err, decoded) =>{

        console.log("display data", decoded);

        if(err) return res.status(500).send({auth:false, message:'Failed to authenticate token'});

        User.findById(decoded.id, {password:0, id:0, _id:0}, (req, user) =>{
            console.log("final", user);

            if(err) return res.status(500).send("there was a problem finding the user");

            if(!user) return res.status(404).send("No user found");

            res.status(200).send(user);
        })


    })
}


module.exports ={create, login, verifyToken};