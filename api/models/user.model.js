var mongoose  = require('mongoose');

var Schema = mongoose.Schema;

var user = new Schema({
    id:{type:String},
    username:{type:String},
    password:{type:String},
    firstname:{type:String},
    lastname:{type:String}
})

const model = mongoose.model('registeruser', user);

module.exports = model;