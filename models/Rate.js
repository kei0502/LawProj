/**
 * Created by eating on 16/5/13.
 */

var mongoose = require('mongoose');
var register = function(){
    var Schema = mongoose.Schema;


    var Rates = new Schema({
            t: String,
            //length: String,
            rate: Number
        }
    );
    mongoose.model('Rate', Rates);
    //var Rate = mongoose.model('Rate', RateTypes);
    //RateType.find({}, function (err, data) {
    //    if(err) throw err;
    //    if(data.length == 0){
    //        var shortTerm_1 = new RateType();
    //        shortTerm_1.type = '0_0.5';
    //        //shortTerm_1.length = 'six';
    //        shortTerm_1.save();
    //        var shortTerm_2 = new RateType();
    //        shortTerm_2.type = '0.5_1';
    //        shortTerm_2.save();
    //        var longTerm_1 = new RateType();
    //        longTerm_1.type = '1_3';
    //        longTerm_1.save();
    //        var longTerm_2 = new RateType();
    //        longTerm_2.type = '3_5';
    //        longTerm_2.save();
    //        var longTerm_3 = new RateType();
    //        longTerm_3.type = '5_';
    //        longTerm_3.save();
    //        synchronize();
    //
    //    }
    //
    //
    //});
};
var model = function(){
    return mongoose.model('Rate');
};
module.exports = {
    register: register,
    model: model
};