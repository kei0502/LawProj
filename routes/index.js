var express = require('express'), authentication = require('./authentication'), HomepageAd = require('../models/HomepageAd').model(), Company = require('../models/Company').model(), Currency = require('../models/Currency').model(), Claim = require('../models/Claim').model(), moment = require('moment');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    HomepageAd.find({}, function (err, ads) {
        if (err) next(err);
        else {
            res.render("web/index/container", {
                data: req.session.loggedIn ? {
                    user: req.session.user,
                    ads: ads
                } : {ads: ads}
            });
        }
    });
});
router.get('/case', function (req, res, next) {
    Company.find({}, "name create case_type", function (err, companies) {
        if (err) next(err);
        else {
            var companies2 = companies.map(company=>({
                _id: company._id,
                name: company.name,
                create: moment(company.create).format("YYYY-MM-DD"),
                case_type: company.case_type
            }));
            res.render('web/case/container', {
                data: req.session.loggedIn ? {
                    user: req.session.user,
                    companies: companies2
                } : {companies: companies2}
            });
        }
    });
});
router.get('/platform', function (req, res, next) {
    if (req.session.loggedIn) {
        res.redirect('/creditor/company');
    } else {
        res.render('index/container', {data: {}});
    }
});
router.get('/company/management', authentication.admin, function (req, res, next) {
    var user = req.session.user;
    Company.find({admin: user._id}).populate('validator_accountant', 'username').populate('claims', 'state').sort('-_id').exec(function (err, companies) {
        if (err) {
            next(err);
        } else {
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
                    validator_accountant: company.validator_accountant,
                    claims: company.claims
                }
            });
            res.render('company/management/container', {data: {user: req.session.user, companies: data}});
        }
    });
});
router.get('/company/apply', authentication.creditor, function (req, res, next) {
    Company.find({expire: {$gte: moment(moment().format('YYYY-MM-DD')).toDate()}}, 'name expire', function (err, companies) {
        if (err) {
            next(err);
        } else {
            var data = companies.map(function (company) {
                return {_id: company._id, name: company.name, expire: moment(company.expire).format("YYYY-MM-DD")};
            });
            res.render('company/apply/container', {data: {user: req.session.user, companies: data}});
        }
    });
});
router.get('/case/:id', authentication.creditor, function (req, res, next) {
    Company.findOne({_id: req.params.id}, function (err, company) {
        if (err) next(err);
        else if (!company) {
            var err = new Error("Wrong company id");
            err.status = 400;
            next(err);
        } else {
            res.render('web/company/container', {
                data: {
                    user: req.session.user, company: {
                        _id: company._id,
                        cid: company.cid,
                        case_type: company.case_type,
                        code: company.code,
                        name: company.name,
                        representative: company.representative,
                        cfo: company.cfo,
                        address3: company.address3,
                        address: company.address,
                        create: moment(company.create).format("YYYY-MM-DD"),
                        expire: moment(company.expire).format("YYYY-MM-DD"),
                        court: company.court,
                        judge: company.judge,
                        collegiates: company.collegiates,
                        note: company.note,
                        vote_start: company.vote_start ? moment(company.vote_start).format("YYYY-MM-DD HH:mm") : undefined,
                        vote_end: company.vote_end ? moment(company.vote_end).format("YYYY-MM-DD HH:mm") : undefined,
                        spot: company.spot,
                        closed: company.closed
                    }
                }
            });
        }
    });
});
router.get('/claim/add', authentication.creditor, function (req, res, next) {
    var companyId = req.query.companyId;
    if (!companyId) {
        var err = new Error("Empty company id");
        err.status = 400;
        next(err);
        return;
    }
    Company.findOne({
        _id: companyId,
        expire: {$gte: moment(moment().format('YYYY-MM-DD')).toDate()}
    }, 'create', function (err, company) {
        if (err) {
            next(err);
        } else if (null == company) {
            var err = new Error("Wrong company id");
            err.status = 400;
            next(err);
        } else {
            Currency.find().populate({
                path: 'exchange',
                match: {date: {$lte: company.create}},
                options: {sort: {date: 'desc'}, limit: 1}
            }).exec(function (err, currencies) {
                if (err) {
                    next(err);
                } else {
                    res.render('claim/edit/container', {
                        data: {
                            user: req.session.user,
                            currencies: currencies,
                            companyId: companyId,
                            create: moment(company.create).format('YYYY-MM-DD'),
                            editable: true
                        }
                    });
                }

            });
        }
    })
});
router.get("/claim/list", authentication.creditor, function (req, res, next) {
    Company.find({}, 'name expire claims').populate({
        path: 'claims',
        match: {agents: req.session.user._id},
        select: 'display state',
    }).exec(function (err, companies) {
        if (err) {
            next(err);
        } else {
            var claims = [];
            companies.forEach(function (company) {
                company.claims.forEach(function (claim) {
                    claims.push({
                        _id: claim._id,
                        display: claim.display,
                        state: claim.state,
                        companyName: company.name,
                        companyExpire: moment(company.expire).format('YYYY-MM-DD')
                    });
                });
            });
            claims.sort(function (a, b) {
                if (a._id === b._id) {
                    return 0;
                } else if (a._id < b._id) {
                    return 1;
                } else {
                    return -1;
                }
            });
            res.render('claim/list/container', {data: {user: req.session.user, claims: claims}});
        }
    });
});
function claimView(editable) {
    return function (req, res, next) {
        var claimId = req.params.claimId;
        Claim.findOne({_id: claimId, agents: req.session.user._id}).populate({
            path: "agents",
            select: "name"
        }).exec(function (err, claim) {
            if (err) {
                next(err);
            } else if (null == claim) {
                var err = new Error("Wrong claim id");
                err.status = 400;
                next(err);
            } else {
                Company.findOne({claims: claimId}, "settlement expire", function (err, company) {
                    if (err) {
                        next(err);
                    } else {
                        Currency.find().populate({
                            path: 'exchange',
                            match: {date: {$lte: company.settlement}},
                            options: {sort: {date: 'desc'}, limit: 1}
                        }).exec(function (err, currencies) {
                            if (err) {
                                next(err);
                            } else {
                                var interest = claim.interest;
                                res.render('claim/edit/container', {
                                    data: {
                                        user: req.session.user,
                                        currencies: currencies,
                                        claim: {
                                            _id: claim._id,
                                            name: claim.name,
                                            representative: claim.representative,
                                            phone_representative: claim.phone_representative,
                                            agents: claim.agents,
                                            phone: claim.phone,
                                            fax: claim.fax,
                                            postcode: claim.postcode,
                                            address: claim.address,
                                            reason: claim.reason,
                                            file: claim.file,
                                            guarantee: claim.guarantee,
                                            judge: claim.judge,
                                            rule: claim.rule,
                                            claim_type: claim.claim_type,
                                            currency: claim.currency,
                                            principal: claim.principal,
                                            interest: interest ? {
                                                calculate: interest.calculate,
                                                start: moment(interest.start).format('YYYY-MM-DD'),
                                                amount: interest.amount
                                            } : undefined,
                                            claim_information: claim.claim_information,
                                            attachments: claim.attachments,
                                            display: claim.display,
                                            state: claim.state
                                        },
                                        settlement: moment(company.settlement).format('YYYY-MM-DD'),
                                        expire: moment(company.expire).format('YYYY-MM-DD'),
                                        editable: editable
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
}
router.get("/claim/view/:claimId", authentication.creditor, claimView(false));
router.get("/claim/edit/:claimId", authentication.creditor, claimView(true));

module.exports = router;
