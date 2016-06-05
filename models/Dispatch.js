/**
 * Created by gyz on 16/6/5.
 */
var mongoose = require('mongoose');
var register = function () {
    var Schema = mongoose.Schema;
    var Dispatches = new Schema({
        receiver: {type: Schema.Types.ObjectId, ref: 'User'},
        name: String,
        file: String,
        date: Date,
        response: {type: {style: Number, text: String}, default: undefined}
    });
    mongoose.model('Dispatch', Dispatches);
};
var model = function () {
    return mongoose.model('Dispatch');
};
module.exports = {register: register, model: model};