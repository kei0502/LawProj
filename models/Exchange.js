/**
 * Created by gyz on 16/5/10.
 */
var mongoose = require('mongoose');
var register = function () {
    var Schema = mongoose.Schema;
    var Exchanges = new Schema({
        date: Date,
        rate: Number
    });
    mongoose.model('Exchange', Exchanges);
};
var model = function () {
    return mongoose.model('Exchange');
};
module.exports = {
    register: register,
    model: model
};