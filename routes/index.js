var express = require('express'), authentication = require('./authentication'), Company = require('../models/Company').model(), moment = require('moment');
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
    Company.find({expire: {$lt: new Date()}}, 'name expire', function (err, companies) {
        if (err) next(err);
        console.log(companies);
        var data = companies.map(function (company) {
            return {_id: company._id, name: company.name, expire: moment(company.expire).format("YYYY-MM-DD")};
        });
        res.render('company/apply/container', {data: {user: req.session.user, companies: data}});
    });
});

module.exports = router;
