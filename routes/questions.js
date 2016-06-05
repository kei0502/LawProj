/**
 * Created by gyz on 16/6/5.
 */
var express = require('express'), moment = require('moment'), Question = require('../models/Question').model(), Company = require('../models/Company').model(), authentication = require('./authentication');
var router = express.Router();
router.post('/', authentication.creditor, function (req, res, next) {
    var companyId = req.query.companyId;
    if (!companyId) {
        res.status(400).send({error: "Empty company id"});
        return;
    }
    Company.findById(companyId, function (err, company) {
        if (err) next(err);
        else if (!company) {
            res.status(400).send({error: "Wrong company id"});
        } else {
            var question = new Question();
            question.ask = {time: new Date(), text: req.body.text};
            question.raiser = req.session.user._id;
            question.save(function (err, question2) {
                if (err) next(err);
                else {
                    company.questions.push(question2._id);
                    company.save(function (err) {
                        if (err) next(err);
                        else {
                            res.send({
                                _id: question2._id,
                                ask: {
                                    time: moment(question2.ask.time).format('YYYY-MM-DD HH:mm'),
                                    text: question2.ask.text
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});
module.exports = router;