/**
 * Created by gyz on 16/5/31.
 */
var express = require('express'), moment = require('moment'), authentication = require('./authentication'), Company = require('../models/Company').model(), Currency = require('../models/Currency').model();
var router = express.Router();
router.use(authentication.creditor);
router.get("/company", function (req, res) {
    Company.find({}, 'name create case_type expire vote_start vote_end closed spot claims').populate({
        path: 'claims',
        match: {agents: req.session.user._id},
        select: 'state'
    }).exec(function (err, companies) {
        if (err) next(err);
        else {
            res.render('creditor/company/container', {
                data: {
                    user: req.session.user, companies: companies.map(function (company) {
                        return {
                            _id: company._id,
                            name: company.name,
                            case_type: company.case_type,
                            create: moment(company.create).format('YYYY-MM-DD'),
                            expire: moment(company.expire).format('YYYY-MM-DD'),
                            vote_start: company.vote_start ? moment(company.vote_start).format('YYYY-MM-DD HH:mm') : undefined,
                            vote_end: company.vote_end ? moment(company.vote_end).format('YYYY-MM-DD HH:mm') : undefined,
                            spot: company.spot,
                            closed: company.closed,
                            claims: company.claims
                        }
                    })
                }
            });
        }
    });
});
function getClaimCallback(add) {
    return function (req, res) {
        var companyId = req.query.companyId;
        if (!companyId) {
            var err = new Error("Empty company id");
            err.status = 400;
            next(err);
            return;
        }
        Company.findById(companyId).populate({
            path: 'claims',
            match: {agents: req.session.user._id}
        }).exec(function (err, company) {
            if (err) next(err);
            else if (!company) {
                var err = new Error("Wrong company id");
                err.status = 400;
                next(err);
            } else {
                Company.find({}, 'name expire vote_start vote_end closed spot claims').populate({
                    path: 'claims',
                    match: {agents: req.session.user._id},
                    select: 'state'
                }).exec(function (err, companies) {
                    if (err) next(err);
                    else {
                        Currency.find().populate({
                            path: 'exchange',
                            match: {date: {$lte: company.create}},
                            options: {sort: {date: 'desc'}, limit: 1}
                        }).exec(function (err, currencies) {
                            if (err) next(err);
                            else {
                                res.render('creditor/claim/container', {
                                    data: {
                                        user: req.session.user,
                                        currencies: currencies,
                                        modalVisible: add,
                                        companies: companies.map(function (company2) {
                                            return {
                                                _id: company2._id,
                                                name: company2.name,
                                                expire: moment(company2.expire).format('YYYY-MM-DD'),
                                                vote_start: company2.vote_start ? moment(company2.vote_start).format('YYYY-MM-DD HH:mm') : undefined,
                                                vote_end: company2.vote_end ? moment(company2.vote_end).format('YYYY-MM-DD HH:mm') : undefined,
                                                spot: company2.spot,
                                                closed: company2.closed,
                                                claims: company2.claims
                                            }
                                        }),
                                        company: {
                                            _id: company._id,
                                            cid: company.cid,
                                            code: company.code,
                                            name: company.name,
                                            representative: company.representative,
                                            cfo: company.cfo,
                                            address3: company.address3,
                                            address: company.address,
                                            create: moment(company.create).format("YYYY-MM-DD"),
                                            court: company.court,
                                            judge: company.judge,
                                            note: company.note,
                                            collegiates: company.collegiates,
                                            expire: moment(company.expire).format("YYYY-MM-DD"),
                                            case_type: company.case_type,
                                            vote_start: company.vote_start ? moment(company.vote_start).format('YYYY-MM-DD HH:mm') : undefined,
                                            vote_end: company.vote_end ? moment(company.vote_end).format('YYYY-MM-DD HH:mm') : undefined,
                                            spot: company.spot,
                                            closed: company.closed,
                                            claims: company.claims.map(function (claim) {
                                                return {
                                                    _id: claim._id,
                                                    name: claim.name,
                                                    representative: claim.representative,
                                                    phone_representative: claim.phone_representative,
                                                    phone: claim.phone,
                                                    fax: claim.fax,
                                                    address3: claim.address3,
                                                    address: claim.address,
                                                    postcode: claim.postcode,
                                                    reason: claim.reason,
                                                    file: claim.file,
                                                    guarantee: claim.guarantee,
                                                    judge: claim.judge,
                                                    rule: claim.rule,
                                                    claim_type: claim.claim_type,
                                                    currency: claim.currency,
                                                    principal: claim.principal,
                                                    interest: claim.interest ? {
                                                        calculate: claim.interest.calculate,
                                                        start: moment(claim.interest.start).format("YYYY-MM-DD")
                                                    } : undefined,
                                                    claim_information: claim.claim_information,
                                                    attachments: claim.attachments,
                                                    display: claim.display,
                                                    verify_court: claim.verify_court,
                                                    verify_company: claim.verify_company,
                                                    verify_accountant: claim.verify_accountant,
                                                    verify_liquidation: claim.verify_liquidation,
                                                    state: claim.state
                                                };
                                            })
                                        }
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
router.get('/claim', getClaimCallback());
router.get('/claim/add', getClaimCallback(true));
module.exports = router;