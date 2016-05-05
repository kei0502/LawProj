/**
 * Created by gyz on 16/5/4.
 */
var mongoose = require('mongoose');
var register = function () {
    var Schema = mongoose.Schema;
    var Users = new Schema({
        username: String, password: String, role: Number, salt: String
    });
    mongoose.model('User', Users);
};
var model = function () {
    return mongoose.model('User');
};
module.exports = {
    register: register,
    model: model
};