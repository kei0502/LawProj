/**
 * Created by gyz on 16/5/6.
 */
var mongoose = require('mongoose');
var register = function () {
    var Schema = mongoose.Schema;
    var Companies = new Schema({
        cid: String,
        code: String,
        name: String,
        representative: String,
        cfo: String,
        address3: [Number],
        address: String,
        create: Date,
        court: {address3: [Number], name: String},
        judge: {name: String, phone: String, position: String},
        note: {name: String, phone: String},
        collegiates: {type: [{name: String, phone: String}], default: []},
        expire: Date,
        case_type: Number,
        vote_start: Date,
        vote_end: Date,
        spot: Boolean,
        closed: Boolean,
        validator_company: {type: [{type: Schema.Types.ObjectId, ref: 'User'}], default: []},
        validator_accountant: {type: [{type: Schema.Types.ObjectId, ref: 'User'}], default: []},
        admin: {type: [{type: Schema.Types.ObjectId, ref: 'User'}], default: []},
        claims: {type: [{type: Schema.Types.ObjectId, ref: 'Claim'}], default: []},
        dispatches: {type: [{type: Schema.Types.ObjectId, ref: 'Dispatch'}], default: []}
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