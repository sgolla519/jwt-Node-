var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/mydb', (err, res) =>{
if(err){
    throw console.error("database not connect");
}else{
    console.log("database connect")
}
})