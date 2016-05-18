/**
 * Created by eating on 16/5/13.
 */
var mongoose = require('mongoose'), moment = require('moment'), RATE = require('./Rate'),
    request = require('request'), jsdom = require('jsdom'), schedule = require('node-schedule');
var synchronize = function (records, startDate) {
    console.log('\n');
    var Rate = RATE.model();
    for (var i in records) {
        console.log(i);
        request.post({
            url: 'http://www.icbc.com.cn/ICBCDynamicSite2/other/rmbcredit.aspx',
            form: {
                __EVENTTARGET: '',
                __EVENTARGUMENT: '',
                __LASTFOCUS: '',
                __VIEWSTATE: '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NDAlJyBhbGlnbj0nQ0VOVEVSJyBoZWlnaHQ9JzE5Jz7lha3kuKrmnIjoh7PkuIDlubTvvIjlkKvvvIk8L3RkPjx0ZCB3aWR0aD0nMzAlJyBhbGlnbj0nY2VudGVyJyBoZWlnaHQ9JzE5Jz40LjM1PC90ZD48L3RyPjx0ciBzdHlsZT0nd2lkdGg6MTAwJSc+PHRkIHdpZHRoPSc0MCUnPjxkaXYgYWxpZ249J2xlZnQnPuOAgOS6jOOAgeS4remVv+acn+i0t+asvjwvZGl2PjwvdGQ+PHRkIHdpZHRoPSczMCUnIGFsaWduPSdjZW50ZXInIGhlaWdodD0nMTknPiZuYnNwOzwvdGQ+PC90cj4gPHRyIHN0eWxlPSd3aWR0aDoxMDAlJz48dGQgd2lkdGg9JzQwJScgYWxpZ249J0NFTlRFUicgaGVpZ2h0PScxOSc+5LiA6Iez5LiJ5bm077yI5ZCr77yJPC90ZD48dGQgd2lkdGg9JzMwJScgYWxpZ249J2NlbnRlcicgaGVpZ2h0PScxOSc+NC43NTwvdGQ+PC90cj48dHIgc3R5bGU9J3dpZHRoOjEwMCUnPjx0ZCB3aWR0aD0nNDAlJyBhbGlnbj0nQ0VOVEVSJyBoZWlnaHQ9JzE5Jz7kuInoh7PkupTlubTvvIjlkKvvvIk8L3RkPjx0ZCB3aWR0aD0nMzAlJyBhbGlnbj0nY2VudGVyJyBoZWlnaHQ9JzE5Jz40Ljc1PC90ZD48L3RyPjx0ciBzdHlsZT0nd2lkdGg6MTAwJSc+PHRkIHdpZHRoPSc0MCUnIGFsaWduPSdDRU5URVInIGhlaWdodD0nMTknPuS6lOW5tOS7peS4ijwvdGQ+PHRkIHdpZHRoPSczMCUnIGFsaWduPSdjZW50ZXInIGhlaWdodD0nMTknPjQuOTwvdGQ+PC90cj48dHIgc3R5bGU9J3dpZHRoOjEwMCUnPjwvdHI+PC90Ym9keT48L3RhYmxlPmRkOC7lcPqrcMp41LRLIyKlJC3A4f0=',
                Sel_Date: i.toString()
            }
        }, function (i) {
            return function (err, response, body) {
                if (err) throw err;
                console.warn('post: http://www.icbc.com.cn/ICBCDynamicSite2/other/rmbcredit.aspx');
                jsdom.env(body, ['https://code.jquery.com/jquery-2.2.3.min.js'], function (err, window) {
                    if (err) throw err;
                    var $ = window.jQuery;
                    var $table = $('table');
                    var $item = $($table[4]).find('td');
                    var returnRates = [];
                    var promise = [];
                    returnRates.push($($item[5]).text());
                    returnRates.push($($item[7]).text());
                    returnRates.push($($item[11]).text());
                    returnRates.push($($item[13]).text());
                    returnRates.push($($item[15]).text());
                    var sixM;
                    if ($($item[5]).text() == '')
                        sixM = 0;
                    else {
                        sixM = $($item[5]).text();
                    }
                    var sixMToOneY = $($item[7]).text(), oneYToThreeY = $($item[11]).text(),
                        ThreeYToFiveY = $($item[13]).text(), fiveY = $($item[15]).text();
                    console.log(returnRates + ':' + i);
                    promise.push(new Promise(function (resolve, reject) {
                        var rate = new Rate();
                        rate.t = '0_0.5';
                        rate.rate = parseFloat(sixM);
                        rate.save(function (err, data) {
                            console.log('save1' + i);
                            if (err) throw err;
                            records[i].rates.push(data._id);
                            resolve(data._id);
                        });
                    }));
                    promise.push(new Promise(function (resolve, reject) {
                        var rate = new Rate();
                        rate.t = '0.5_1';
                        rate.rate = parseFloat(sixMToOneY);
                        rate.save(function (err, data) {
                            console.log('save2' + i);
                            if (err) throw err;
                            records[i].rates.push(data._id);
                            resolve(data._id);
                        });
                    }));
                    promise.push(new Promise(function (resolve, reject) {
                        var rate = new Rate();
                        rate.t = '1_3';
                        rate.rate = parseFloat(oneYToThreeY);
                        rate.save(function (err, data) {
                            console.log('save3' + i);
                            if (err) throw err;
                            records[i].rates.push(data._id);
                            resolve(data._id);
                        });
                    }));
                    promise.push(new Promise(function (resolve, reject) {
                        var rate = new Rate();
                        rate.t = '3_5';
                        rate.rate = parseFloat(ThreeYToFiveY);
                        rate.save(function (err, data) {
                            console.log('save4' + i);
                            if (err) throw err;
                            records[i].rates.push(data._id);
                            resolve(data._id);
                        });
                    }));
                    promise.push(new Promise(function (resolve, reject) {
                        var rate = new Rate();
                        rate.t = '5_';
                        rate.rate = parseFloat(fiveY);
                        rate.save(function (err, data) {
                            console.log('save5' + i);
                            if (err) throw err;
                            records[i].rates.push(data._id);
                            resolve(data._id);
                        });
                    }));
                    Promise.all(promise).then(function () {
                        console.warn('promise run success : ' + i);
                        records[i].save();
                    }, function () {
                        throw new Error("promise not fulfilled");
                    });
                });
            };
        }(i));
    };
};
var register = function () {
    initialize();
    //schedule.scheduleJob('30 1 1 * * 0', function () {
    //    initialize();
    //});
    // 每天一次获取信息
    var rule = new schedule.RecurrenceRule();
    rule.hour = 1;
    rule.minute = 30;
    schedule.scheduleJob(rule, function(){
        initialize();
    });
};
var initialize = function () {
    var Schema = mongoose.Schema;
    var RateDates = new Schema({
        date: Date,
        rates: [{type: Schema.Types.ObjectId, ref: 'Rate', default: []}]
    });
    var RateDate = mongoose.model('RateDate', RateDates);
    var dateArray = [];
    request.get({
        url: 'http://www.icbc.com.cn/ICBCDynamicSite2/other/rmbcredit.aspx',
    }, function (err, response, body) {
        if (err) throw err;
        console.warn('get: http://www.icbc.com.cn/ICBCDynamicSite2/other/rmbcredit.aspx');
        jsdom.env(body, ['https://code.jquery.com/jquery-2.2.3.min.js'], function (err, window) {
            if (err) throw err;

            var $ = window.jQuery;
            var $option = $('option');
            $option.each(function (i, item) {
                    if (i !== 0 && item.text !== '1996-05-01') { //&& item.text !== '1998-11-27' && item.text !== '1998-12-07'
                        console.log(item.text);
                        dateArray.push(item.text);
                    }
                }
            );
            RateDate.findOne({}, null, {sort: {date: -1}, limit: 1}, function (err, data) {
                if (err) throw err;
                var records = {};
                if (!data) {
                    for (i in dateArray) {
                        var newRecord = new RateDate();
                        newRecord.date = moment(dateArray[i]).toDate();
                        newRecord.rates = [];
                        //newRecord.save();
                        records[dateArray[i]] = newRecord;
                    }
                    synchronize(records, '1996-04-01');
                } else {
                    var latest = moment(data.date).format('YYYY-MM-DD');
                    var count = 0;
                    for (i in dateArray) {
                        if (dateArray[i] > latest) {
                            count = count + 1;
                            var newRecord = new RateDate();
                            newRecord.date = moment(dateArray[i]).toDate();
                            newRecord.rates = [];
                            records[dateArray[i]] = newRecord;
                        }
                    }
                    if (count > 0)
                        synchronize(records, latest);
                }
            });
        });
    });
};
var model = function () {
    var est = new RateDate();
    return mongoose.model('Rate');
};
module.exports = {
    register: register,
    model: model
};