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
    var companyId = req.query.companyId;
    if (!companyId) {
        var err = new Error("Empty company id");
        err.status = 400;
        next(err);
    }
    Company.findOne({
        _id: companyId,
        expire: {$gte: moment(moment().format('YYYY-MM-DD')).toDate()}
    }, 'settlement', function (err, company) {
        if (err) next(err);
        if (null == company) {
            var err = new Error("Wrong company id");
            err.status = 400;
            next(err);
        }
        Currency.find().populate({
            path: 'exchange',
            match: {date: {$lte: company.settlement}},
            options: {sort: {date: 'desc'}, limit: 1}
        }).exec(function (err, currencies) {
            if (err) next(err);
            res.render('claim/edit/container', {
                data: {
                    user: req.session.user,
                    currencies: currencies,
                    companyId: companyId,
                    editable: true
                }
            });
        });
    })
});
router.get("/claim/view", authentication.creditor, function (req, res, next) {
    var claimId = req.query.claimId;
    if (!claimId) {
        var err = new Error("Empty claim id");
        err.status = 400;
        next(err);
    }
    Claim.findOne({_id: claimId, agents: req.session.user._id}).populate({
        path: "agents",
        select: "name"
    }).exec(function (err, claim) {
        if (err) next(err);
        if (null == claim) {
            var err = new Error("Wrong claim id");
            err.status = 400;
            next(err);
        }
        Company.findOne({claims: claimId}, "settlement", function (err, company) {
            if (err) next(err);
            Currency.find().populate({
                path: 'exchange',
                match: {date: {$lte: company.settlement}},
                options: {sort: {date: 'desc'}, limit: 1}
            }).exec(function (err, currencies) {
                if (err) next(err);
                res.render('claim/edit/container', {
                    data: {
                        user: req.session.user,
                        currencies: currencies,
                        claim: claim,
                        editable: false
                    }
                });
            });
        })
    });
});

module.exports = router;
