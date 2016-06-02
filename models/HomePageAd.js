var mongoose = require('mongoose');
var register = function () {
    var Schema = mongoose.Schema;
    var HomepageAds = new Schema({
        pic: String
    });
    mongoose.model('HomepageAd', HomepageAds);
};
var model = function () {
    return mongoose.model('HomepageAd');
};
module.exports = {
    register: register,
    model: model
};