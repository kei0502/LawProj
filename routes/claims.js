/**
 * Created by gyz on 16/5/5.
 */
var express = require('express'), moment = require('moment'), Claim = require('../models/Claim').model(), multipart = require('connect-multiparty'), Company = require('../models/Company').model(), fs = require('fs'), authentication = require('./authentication'), path = require('path');
var router = express.Router(), multipartMiddleware = multipart({uploadDir: './public/uploads'});
function cleanUpFile(req) {
    for (var fileIndex in req.files) {
        console.warn(req.files[fileIndex].path);
        fs.unlink(req.files[fileIndex].path);
    }
}
function getPath(path) {
    return path.substring(path.indexOf("public") + 6);
}
router.post('/', authentication.creditor, function (req, res, next) {
    var companyId = req.query.companyId;
    if (!companyId) {
        res.status(400).send({error: "Empty company id"});
        return;
    }
    Company.findOne({
        _id: companyId,
        expire: {$gte: moment(moment().format('YYYY-MM-DD')).toDate()}
    }, function (err, company) {
        if (err) next(err);
        else if (null == company) {
            res.status(400).send({error: "Wrong company id"});
        } else {
            var claim = new Claim();
            claim.name = req.body.name;
            claim.representative = req.body.representative;
            claim.phone_representative = req.body.phone_representative;
            claim.agents = [req.session.user._id];
            claim.phone = req.body.phone;
            claim.fax = req.body.fax;
            claim.address3 = JSON.parse(req.body.address3);
            claim.address = req.body.address;
            claim.postcode = req.body.postcode;
            claim.reason = req.body.reason;
            claim.file = req.body.file;
            if (req.body.guarantee) {
                claim.guarantee = JSON.parse(req.body.guarantee);
            } else {
                claim.guarantee = undefined;
            }
            if (req.body.judge) {
                claim.judge = JSON.parse(req.body.judge);
            } else {
                claim.judge = undefined;
            }
            claim.rule = !!req.body.rule;
            claim.claim_type = Number(req.body.claim_type);
            claim.currency = req.body.currency;
            claim.principal = Number(req.body.principal);
            var interest = req.body.interest;
            if (interest) {
                var interestTemp = JSON.parse(interest);
                interest = {
                    calculate: Number(interestTemp.calculate),
                    start: moment(interestTemp.start).toDate(),
                    amount: Number(interestTemp.amount)
                };
            }
            claim.interest = interest;
            claim.claim_information = req.body.claim_information;
            claim.display = req.body.display;
            claim.attachments = JSON.parse(req.body.attachments);
            claim.save(function (err, claim2) {
                if (err) {
                    next(err);
                } else {
                    company.claims.push(claim2._id);
                    company.save(function (err) {
                        if (err) {
                            next(err);
                        } else {
                            res.send({
                                _id: claim2._id,
                                name: claim2.name,
                                representative: claim2.representative,
                                phone_representative: claim2.phone_representative,
                                phone: claim2.phone,
                                fax: claim2.fax,
                                address3: claim2.address3,
                                address: claim2.address,
                                postcode: claim2.postcode,
                                reason: claim2.reason,
                                file: claim2.file,
                                guarantee: claim2.guarantee,
                                judge: claim2.judge,
                                rule: claim2.rule,
                                claim_type: claim2.claim_type,
                                currency: claim2.currency,
                                principal: claim2.principal,
                                interest: claim2.interest ? {
                                    calculate: claim2.interest.calculate,
                                    start: moment(claim2.interest.start).format("YYYY-MM-DD")
                                } : undefined,
                                claim_information: claim2.claim_information,
                                attachments: claim2.attachments,
                                display: claim2.display,
                                verify_court: claim2.verify_court,
                                verify_company: claim2.verify_company,
                                verify_accountant: claim2.verify_accountant,
                                verify_liquidation: claim2.verify_liquidation,
                                state: claim2.state
                            });
                        }
                    });
                }
            });
        }
    });
});
router.post('/upload', authentication.creditor, multipartMiddleware, function (req, res, next) {
    if (!req.files.file) {
        cleanUpFile(req);
        res.status(400).send({error: 'Name should be file'});
    }
    var companyId = req.query.companyId;
    if (!companyId) {
        cleanUpFile(req);
        res.status(400).send({error: 'Empty company id'});
    } else {
        Company.findById({_id: companyId}, 'name', function (err, company) {
            if (err) {
                cleanUpFile(req);
                next(err);
            } else {
                fs.stat('./public/uploads/' + companyId, function (err) {
                    if (err) {
                        fs.mkdir('./public/uploads/' + companyId, 0o755, function (err) {
                            if (err) {
                                cleanUpFile(req);
                                next(err);
                                var path = req.files.file.path, fileName = path.substring(path.indexOf('public') + 15);
                                fs.rename(path, './public/uploads/' + companyId + '/' + fileName, function (err) {
                                    if (err) next(err);
                                    else res.send({url: "/uploads/" + companyId + "/" + fileName});
                                });
                            }
                        })
                    } else {
                        var path = req.files.file.path, fileName = path.substring(path.indexOf('public') + 15);
                        fs.rename(path, './public/uploads/' + companyId + '/' + fileName, function (err) {
                            if (err) next(err);
                            else res.send({url: "/uploads/" + companyId + "/" + fileName});
                        });
                    }
                });
            }
        });
    }
});
router.put('/:claimId', authentication.creditor, function (req, res, next) {
    Claim.findOne({_id: req.params.claimId, agents: req.session.user._id}, function (err, claim) {
        if (err) {
            next(err);
        } else if (null == claim) {
            res.status(400).send({error: "Wrong claim id"});
        } else {
            claim.name = req.body.name;
            claim.representative = req.body.representative;
            claim.phone_representative = req.body.phone_representative;
            claim.agents = [req.session.user._id];
            claim.phone = req.body.phone;
            claim.fax = req.body.fax;
            claim.address3 = JSON.parse(req.body.address3);
            claim.address = req.body.address;
            claim.postcode = req.body.postcode;
            claim.reason = req.body.reason;
            claim.file = req.body.file;
            if (req.body.guarantee) {
                claim.guarantee = JSON.parse(req.body.guarantee);
            } else {
                claim.guarantee = undefined;
            }
            if (req.body.judge) {
                claim.judge = JSON.parse(req.body.judge);
            } else {
                claim.judge = undefined;
            }
            claim.rule = !!req.body.rule;
            claim.claim_type = Number(req.body.claim_type);
            claim.currency = req.body.currency;
            claim.principal = Number(req.body.principal);
            var interest = req.body.interest;
            if (interest) {
                var interestTemp = JSON.parse(interest);
                interest = {
                    calculate: Number(interestTemp.calculate),
                    start: moment(interestTemp.start).toDate(),
                    amount: Number(interestTemp.amount)
                };
            }
            claim.interest = interest;
            claim.claim_information = req.body.claim_information;
            claim.display = req.body.display;
            claim.attachments = JSON.parse(req.body.attachments);
            claim.save(function (err, claim2) {
                if (err) {
                    next(err);
                } else {
                    res.send({
                        _id: claim2._id,
                        name: claim2.name,
                        representative: claim2.representative,
                        phone_representative: claim2.phone_representative,
                        phone: claim2.phone,
                        fax: claim2.fax,
                        address3: claim2.address3,
                        address: claim2.address,
                        postcode: claim2.postcode,
                        reason: claim2.reason,
                        file: claim2.file,
                        guarantee: claim2.guarantee,
                        judge: claim2.judge,
                        rule: claim2.rule,
                        claim_type: claim2.claim_type,
                        currency: claim2.currency,
                        principal: claim2.principal,
                        interest: claim2.interest ? {
                            calculate: claim2.interest.calculate,
                            start: moment(claim2.interest.start).format("YYYY-MM-DD")
                        } : undefined,
                        claim_information: claim2.claim_information,
                        attachments: claim2.attachments,
                        display: claim2.display,
                        verify_court: claim2.verify_court,
                        verify_company: claim2.verify_company,
                        verify_accountant: claim2.verify_accountant,
                        verify_liquidation: claim2.verify_liquidation,
                        state: claim2.state
                    });
                }
            });
        }
    });
});
router.get('/:id', function (req, res, next) {
    //if (req.session.loggedIn) {
    var _id = req.params.id;
    Claim.find({_id: _id}).exec(function (err, claims) {
        if (err) next(err);
        res.send(claims.map(function (claim) {
            return {
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
                garantee: claim.garantee,
                judge: claim.judge,
                rule: claim.rule,
                claim_type: claim.claim_type,
                currency: claim.currency,
                principal: claim.principal,
                interest_type: claim.interest_type,
                interest: claim.interest,
                claim_information: claim.claim_information,
                attachments: claim.attachments
            }
        }));
    });
    //}
});
module.exports = router;