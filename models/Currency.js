/**
 * Created by gyz on 16/5/10.
 */
var mongoose = require('mongoose'), moment = require('moment'), exchange = require('./Exchange'), request = require('request'), jsdom = require('jsdom'), schedule = require('node-schedule');
var synchronize = function (currencies, startDate) {
    var endDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
    if (startDate > endDate) {
        console.warn('no need to synchronize');
        return;
    }
    request.post({
        url: 'http://www.chinamoney.com.cn/fe-c/historyParity.do', form: {
            startDate: startDate,
            endDate: endDate,
            flagMessage: ''
        }
    }, function (err, response, body) {
        if (err) throw err;
        console.warn("posted http://www.chinamoney.com.cn/fe-c/historyParity.do");
        jsdom.env(body, ['https://code.jquery.com/jquery-2.2.3.min.js'], function (err, window) {
            if (err) throw err;
            var $ = window.jQuery;
            var Exchange = exchange.model();
            var $table = $('div table'), $tr = $table.find('tr').first(), indexes = [], promises = [];
            $tr.children(':gt(0)').map(function () {
                indexes.push($(this).text());
            });
            $tr.nextAll().map(function () {
                var $td = $(this).children().first();
                var date = moment($td.children().first().text()).toDate();
                $td.nextAll().map(function (i) {
                    var self = this;
                    promises.push(new Promise(function (resolve, reject) {
                        var exchange = new Exchange();
                        exchange.date = date;
                        exchange.rate = parseFloat($(self).text());
                        exchange.save(function (err, data) {
                            if (err) throw err;
                            currencies[indexes[i]].exchange.push(data._id);
                            resolve(data._id);
                        });
                    }));
                });
            });
            Promise.all(promises).then(function () {
                console.warn('promise run success');
                for (var i in currencies) {
                    currencies[i].save();
                }
            }, function () {
                throw new Error("promise not fulfilled");
            });
        });
    });
};
var register = function () {
    var Schema = mongoose.Schema;
    var Currencies = new Schema({
        name: String,
        code: String,
        exchange: [{type: Schema.Types.ObjectId, ref: "Exchange", default: []}]
    });
    var Currency = mongoose.model('Currency', Currencies);
    Currency.find({}, function (err, data) {
        if (err) throw err;
        var currencies = {};
        data.forEach(function (currency) {
            if (currency.code !== 'CNY') {
                currencies[currency.code] = currency;
            }
        });
        if (data.length == 0) {
            var cny = new Currency();
            cny.name = '人民币';
            cny.code = 'CNY';
            cny.save();
            var usd = new Currency();
            usd.name = '美元';
            usd.code = 'USD/CNY';
            usd.exchange = [];
            currencies['USD/CNY'] = usd;
            var eur = new Currency();
            eur.name = '欧元';
            eur.code = 'EUR/CNY';
            eur.exchange = [];
            currencies['EUR/CNY'] = eur;
            var jpy = new Currency();
            jpy.name = '日元';
            jpy.code = '100JPY/CNY';
            jpy.exchange = [];
            currencies['100JPY/CNY'] = jpy;
            var hkd = new Currency();
            hkd.name = '港币';
            hkd.code = 'HKD/CNY';
            hkd.exchange = [];
            currencies['HKD/CNY'] = hkd;
            var gbp = new Currency();
            gbp.name = '英镑';
            gbp.code = 'GBP/CNY';
            gbp.exchange = [];
            currencies['GBP/CNY'] = gbp;
            var aud = new Currency();
            aud.name = '澳元';
            aud.code = 'AUD/CNY';
            aud.exchange = [];
            currencies['AUD/CNY'] = aud;
            var nzd = new Currency();
            nzd.name = '新西兰元';
            nzd.code = 'NZD/CNY';
            nzd.exchange = [];
            currencies['NZD/CNY'] = nzd;
            var sgd = new Currency();
            sgd.name = '新加坡元';
            sgd.code = 'SGD/CNY';
            sgd.exchange = [];
            currencies['SGD/CNY'] = sgd;
            var chf = new Currency();
            chf.name = '瑞士法郎';
            chf.code = 'CHF/CNY';
            chf.exchange = [];
            currencies['CHF/CNY'] = chf;
            var cad = new Currency();
            cad.name = '加元';
            cad.code = 'CAD/CNY';
            cad.exchange = [];
            currencies['CAD/CNY'] = cad;
            var myr = new Currency();
            myr.name = '林吉特';
            myr.code = 'CNY/MYR';
            myr.exchange = [];
            currencies['CNY/MYR'] = myr;
            var rub = new Currency();
            rub.name = '卢布';
            rub.code = 'CNY/RUB';
            rub.exchange = [];
            currencies['CNY/RUB'] = rub;
            synchronize(currencies, '2016-01-01');
        } else {
            exchange.model().find().sort('-date').limit(1).exec(function (err, exchanges) {
                if (err) throw err;
                var startDate = moment(exchanges[0].date).add(1, 'days').format('YYYY-MM-DD');
                synchronize(currencies, startDate);
            });
        }
        var rule = new schedule.RecurrenceRule();
        rule.hour = 0;
        rule.minute = 0;
        schedule.scheduleJob(rule, function () {
            console.warn("scheduled exchange rate synchronizing");
            exchange.model().find().sort('-date').limit(1).exec(function (err, exchanges) {
                if (err) throw err;
                var startDate = moment(exchanges[0].date).add(1, 'days').format('YYYY-MM-DD');
                synchronize(currencies, startDate);
            });
        });
    });
};
var model = function () {
    return mongoose.model('Currency');
};
module.exports = {
    register: register,
    model: model
};