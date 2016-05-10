/**
 * Created by gyz on 16/5/5.
 */
var express = require('express'), moment = require('moment'), authentication = require('./authentication'), Company = require('../models/Company').model();
var router = express.Router();
router.post('/', authentication.admin, function (req, res, next) {
    var company = new Company();
    company.cid = req.body.cid;
    company.name = req.body.name;
    company.create = moment(req.body.create).toDate();
    company.settlement = moment(req.body.settlement).toDate();
    company.expire = moment(req.body.expire).toDate();
    company.admin = [req.session.user._id];
    company.save(function (err, company) {
        if (err) next(err);
        res.send({
            _id: company._id,
            cid: company.cid,
            name: company.name,
            create: moment(company.create).format("YYYY-MM-DD"),
            settlement: moment(company.settlement).format("YYYY-MM-DD"),
            expire: moment(company.expire).format("YYYY-MM-DD"),
            vote: moment(company.vote).format("YYYY-MM-DD"),
            validator_company: company.validator_company,
            validator_accountant: company.validator_accountant
        });
    });
});
router.get('/', function (req, res, next) {
    if (req.session.loggedIn) {
        var _id = req.session.user._id, role = req.session.user.role;
        if (role == 2) {
            Company.find({admin: _id}).populate('validator_accountant', 'username').sort('-_id').exec(function (err, companies) {
                if (err) next(err);
                res.send(companies.map(function (company) {
                    return {
                        _id: company._id,
                        cid: company.cid,
                        name: company.name,
                        create: moment(company.create).format("YYYY-MM-DD"),
                        settlement: moment(company.settlement).format("YYYY-MM-DD"),
                        expire: moment(company.expire).format("YYYY-MM-DD"),
                        vote: moment(company.vote).format("YYYY-MM-DD"),
                        validator_company: company.validator_company,
                        validator_accountant: company.validator_accountant
                    }
                }));
            });
        }
    }
});
module.exports = router;