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
        vote: {type: Date, default: undefined},
        validator_company: {type: [{type: Schema.Types.ObjectId, ref: 'User'}], default: []},
        validator_accountant: {type: [{type: Schema.Types.ObjectId, ref: 'User'}], default: []},
        admin: {type: [{type: Schema.Types.ObjectId, ref: 'User'}], default: []},
        claims: {type: [{type: Schema.Types.ObjectId, ref: 'Claim'}], default: []}
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