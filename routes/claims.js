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
router.post('/', authentication.creditor, multipartMiddleware, function (req, res, next) {
    var companyId = req.query.companyId;
    if (!companyId) {
        cleanUpFile(req);
        res.status(400).send({error: "Empty company id"});
        return;
    }
    Company.findOne({
        _id: companyId,
        expire: {$gte: moment(moment().format('YYYY-MM-DD')).toDate()}
    }, function (err, company) {
        if (err) {
            cleanUpFile(req);
            next(err);
        } else if (null == company) {
            cleanUpFile(req);
            res.status(400).send({error: "Wrong company id"});
        } else {
            var claim = new Claim();
            claim.name = req.body.name;
            claim.representative = req.body.representative;
            claim.phone_representative = req.body.phone_representative;
            claim.agents = JSON.parse(req.body.agents);
            claim.phone = req.body.phone;
            claim.fax = req.body.fax;
            claim.postcode = req.body.postcode;
            claim.address = req.body.address;
            claim.reason = req.body.reason;
            if (req.body.guarantee) {
                claim.guarantee = JSON.parse(req.body.guarantee);
            } else {
                claim.guarantee = undefined;
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
            if (req.files.file) {
                claim.file = getPath(req.files.file.path);
            }
            if (req.body.judgedMoney) {
                if (!claim.judge && !req.files.judgedFile) {
                    res.status(400).send({error: "必须上传诉讼费凭证"});
                    return;
                }
                claim.judge = {
                    money: Number(req.body.judgedMoney),
                    file: req.files.judgedFile ? getPath(req.files.judgedFile.path) : claim.judge.file
                };
            } else {
                claim.judge = undefined;
            }
            claim.attachments = JSON.parse(req.body.attachments);
            var newAttachments = JSON.parse(req.body.newAttachments);
            newAttachments.forEach(function (attachment, i) {
                claim.attachments.push({
                    name: attachment.name,
                    style: attachment.style,
                    path: getPath(req.files["newAttachment" + i].path)
                });
            });
            claim.save(function (err, claim2) {
                if (err) {
                    next(err);
                } else {
                    company.claims.push(claim2._id);
                    company.save(function (err, company2) {
                        if (err) {
                            next(err);
                        } else {
                            res.send(claim2);
                        }
                    });
                }
            });
        }
    });
});
router.put('/:claimId', authentication.creditor, multipartMiddleware, function (req, res, next) {
    Claim.findOne({_id: req.params.claimId, agents: req.session.user._id}, function (err, claim) {
        if (err) {
            cleanUpFile(req);
            next(err);
        } else if (null == claim) {
            cleanUpFile(req);
            res.status(400).send({error: "Wrong claim id"});
        } else {
            claim.name = req.body.name;
            claim.representative = req.body.representative;
            claim.phone_representative = req.body.phone_representative;
            claim.agents = JSON.parse(req.body.agents);
            claim.phone = req.body.phone;
            claim.fax = req.body.fax;
            claim.postcode = req.body.postcode;
            claim.address = req.body.address;
            claim.reason = req.body.reason;
            if (req.body.guarantee) {
                claim.guarantee = JSON.parse(req.body.guarantee);
            } else {
                claim.guarantee = undefined;
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
            if (req.files.file) {
                claim.file = getPath(req.files.file.path);
            }
            if (req.body.judgedMoney) {
                if (!claim.judge && !req.files.judgedFile) {
                    res.status(400).send({error: "必须上传诉讼费凭证"});
                    return;
                }
                claim.judge = {
                    money: Number(req.body.judgedMoney),
                    file: req.files.judgedFile ? getPath(req.files.judgedFile.path) : claim.judge.file
                };
            } else {
                claim.judge = undefined;
            }
            claim.attachments = JSON.parse(req.body.attachments);
            var newAttachments = JSON.parse(req.body.newAttachments);
            newAttachments.forEach(function (attachment, i) {
                claim.attachments.push({
                    name: attachment.name,
                    style: attachment.style,
                    path: getPath(req.files["newAttachment" + i].path)
                });
            });
            claim.save(function (err, claim2) {
                if (err) {
                    next(err);
                } else {
                    console.log(claim2);
                    res.send(claim2);
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