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
        agents: {type: [Schema.Types.ObjectId], ref: 'User'},
        phone: String,
        fax: String,
        postcode: String,
        address: String,
        reason: String,
        file: String,
        garantee: {name: String, money: String, style: Number},
        judge: Boolean,
        rule: Boolean,
        claim_type: Number,
        currency: {type: [Schema.Types.ObjectId], ref: 'Currency'},
        principal: Number,
        interest_type: Number,
        interest: Number,
        claim_information: String,
        attachments: [{name: String, path: String, attachment_type: Number}]
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