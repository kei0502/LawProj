var express = require('express'), authentication = require('./authentication'), Company = require('../models/Company').model(), Currency = require('../models/Currency').model(), Claim = require('../models/Claim').model(), moment = require('moment');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render("index/container", {data: req.session.loggedIn ? {user: req.session.user} : {}});
});
router.get('/company/management', authentication.admin, function (req, res, next) {
    var user = req.session.user;
    Company.find({admin: user._id}).populate('validator_accountant', 'username').sort('-_id').exec(function (err, companies) {
        if (err) next(err);
        var data = companies.map(function (company) {
            return {
                _id: company._id,
                cid: company.cid,
                name: company.name,
                create: moment(company.create).format("YYYY-MM-DD"),
                settlement: moment(company.settlement).format("YYYY-MM-DD"),
                expire: moment(company.expire).format("YYYY-MM-DD"),
                vote: company.vote ? moment(company.vote).format("YYYY-MM-DD") : undefined,
                validator_company: company.validator_company,
                validator_accountant: company.validator_accountant
            }
        });
        res.render('company/management/container', {data: {user: req.session.user, companies: data}});
    });
});
router.get('/company/apply', authentication.creditor, function (req, res, next) {
    Company.find({expire: {$gte: moment(moment().format('YYYY-MM-DD')).toDate()}}, 'name expire', function (err, companies) {
        if (err) next(err);
        var data = companies.map(function (company) {
            return {_id: company._id, name: company.name, expire: moment(company.expire).format("YYYY-MM-DD")};
        });
        res.render('company/apply/container', {data: {user: req.session.user, companies: data}});
    });
});
router.get('/claim/add', authentication.creditor, function (req, res, next) {
    if (!req.query.companyId) {
        var err = new Error("Empty company id");
        err.status(400);
        next(err);
    }
    Company.findOne({_id: req.query.companyId}, function (err, company) {
        if (err) next(err);
        if (null == company) {
            var err = new Error("Wrong company id");
            err.status(400);
            next(err);
        }
        Currency.find().populate('exchange').exec(function (err, currencies) {
            if (err) next(err);
            var newCurrencies = currencies.map(function (currency) {
                var start = new Date(), end = company.settlement.getTime();
                start.setTime(0);
                var exchange = currency.exchange.length === 0 ? undefined : currency.exchange.reduce(function (v, exchange) {
                    var start = v.date.getTime(), exchangeDate = exchange.date.getTime();
                    if (start < exchangeDate && exchangeDate <= end) {
                        return exchange;
                    } else {
                        return v;
                    }
                }, {date: start, rate: 0});
                return {
                    _id: currency._id,
                    name: currency.name,
                    code: currency.code,
                    exchange: exchange
                };
            });
            var claim = new Claim(), user = req.session.user;
            claim.agents = [user];
            claim.save(function (err, claim) {
                if (err) next(err);
                company.claims.push(claim._id);
                company.save(function (err, company) {
                    if (err) next(err);
                    claim.populate({path: 'agents', select: 'name'}, function (err, claim) {
                        if (err) next(err);
                        res.render('claim/edit/container', {
                            data: {
                                user: user,
                                claim: claim,
                                currencies: newCurrencies
                            }
                        });
                    });
                });
            });
        });
    })
});

module.exports = router;
