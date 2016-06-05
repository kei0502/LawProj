/**
 * Created by gyz on 16/6/5.
 */
var mongoose = require('mongoose');
var register = function () {
    var Schema = mongoose.Schema;
    var Questions = new Schema({
        ask: {time: Date, text: String},
        answer: {type: {time: Date, text: String}, default: undefined},
        raiser: {type: Schema.Types.ObjectId, ref: "User"}
    });
    mongoose.model('Question', Questions);
};
var model = function () {
    return mongoose.model('Question');
};
module.exports = {register: register, model: model};