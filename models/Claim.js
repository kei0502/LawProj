/**
 * Created by gyz on 16/5/10.
 */
var mongoose = require('mongoose');
var register = function () {
    var Schema = mongoose.Schema;
    var Claims = new Schema({
        name: String,
        representative: String,
        phone_representative: String,
        agents: [{type: Schema.Types.ObjectId, ref: 'User'}],
        phone: String,
        fax: String,
        postcode: String,
        address: String,
        reason: String,
        file: String,
        guarantee: {type: {name: String, money: Number, style: Number}, default: undefined},
        judge: {type: {money: Number, file: String}, default: undefined},
        rule: Boolean,
        claim_type: Number,
        currency: {type: Schema.Types.ObjectId, ref: 'Currency'},
        principal: Number,
        interest: {type: {calculate: Number, start: Date, amount: Number}, default: undefined},
        claim_information: String,
        attachments: {type: [{name: String, path: String, style: Number}], default: []},
        display: String,
        state: {type: Number, default: 1}
    });
    mongoose.model('Claim', Claims);
};
var model = function () {
    return mongoose.model('Claim');
};
module.exports = {
    register: register,
    model: model
};