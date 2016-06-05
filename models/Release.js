/**
 * Created by gyz on 16/6/5.
 */
var mongoose = require('mongoose');
var register = function () {
    var Schema = mongoose.Schema;
    var Releases = new Schema({
        name: String,
        date: Date,
        files: [{name: String, file: String}],
        verify: {type: Boolean, default: false}
    });
    mongoose.model('Release', Releases);
};
var model = function () {
    return mongoose.model('Release');
};
module.exports = {register: register, model: model};