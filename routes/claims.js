/**
 * Created by gyz on 16/5/5.
 */
var express = require('express'), moment = require('moment'), Claim = require('../models/Claim').model();
var router = express.Router();
router.post('/', function (req, res, next) {
    var claim = new Claim();
    claim.name = req.body.name;
    claim.representative = req.body.representative;
    claim.phone_representative = req.body.phone_representative;
    claim.agents = req.body.agents;
    claim.garantee = req.body.garantee;
    claim.phone = req.body.phone;
    claim.fax = req.body.fax;
    claim.postcode = req.body.postcode;
    claim.address = req.body.address;
    claim.reason = req.body.reason;
    claim.file = req.body.file;
    claim.judge = req.body.judge;
    claim.rule = req.body.rule;
    claim.claim_type = req.body.claim_type;
    claim.currency = req.body.currency;
    claim.principal = req.body.principal;
    claim.interest_type = req.body.interest_type;
    claim.interest = req.body.interest;
    claim.claim_information = req.body.claim_information;
    claim.attachments = req.body.attachments;
    claim.save(function (err, claim) {
        if (err) next(err);
        res.send({
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
        });
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