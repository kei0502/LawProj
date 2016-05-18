/**
 * Created by gyz on 16/5/10.
 */
var express = require('express'), Currency = require('../models/Currency').model(), moment = require('moment');
var router = express.Router();
router.get('/', function (req, res, next) {
    Currency.find().populate('exchange').exec(function (err, currencies) {
        if (err) {
            next(err);
        } else {
            res.send(currencies.map(function (currency) {
                return {
                    name: currency.name, exchange: currency.exchange.map(function (exchange) {
                        return {date: moment(exchange.date).format('YYYY-MM-DD'), rate: exchange.rate};
                    })
                };
            }));
        }
    });
});
router.get('/:date', function (req, res, next) {
    var date = moment(req.params.date);
    Currency.find().populate('exchange').exec(function (err, currencies) {
        if (err) {
            next(err);
        } else {
            res.send(currencies.map(function (currency) {
                return {
                    name: currency.name, exchange: currency.exchange.filter(function (exchange) {
                        return date.isSameOrAfter(exchange.date);
                    }).sort(function (e1, e2) {
                        return e2.date.getTime() - e1.date.getTime();
                    }).map(function (exchange) {
                        return {date: moment(exchange.date).format('YYYY-MM-DD'), rate: exchange.rate}
                    }).slice(0, 1)
                };
            }));
        }
    });
});
module.exports = router;