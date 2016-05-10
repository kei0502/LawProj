/**
 * Created by gyz on 16/5/6.
 */
var mongoose = require('mongoose');
var register = function () {
    var Schema = mongoose.Schema;
    var Companies = new Schema({
        cid: String,
        name: String,
        create: Date,
        settlement: Date,
        expire: Date,
        vote: Date,
        validator_company: {type: [Schema.Types.ObjectId], ref: 'User', default: []},
        validator_accountant: {type: [Schema.Types.ObjectId], ref: 'User', default: []},
        admin: {type: [Schema.Types.ObjectId], ref: 'User', default: []},
        claims: {type: [Schema.Types.ObjectId], ref: '', default: []}
    });
    mongoose.model('Company', Companies);
};
var model = function () {
    return mongoose.model('Company');
};
module.exports = {
    register: register,
    model: model
};