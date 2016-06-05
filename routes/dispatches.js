/**
 * Created by gyz on 16/6/5.
 */
var express = require('express'), moment = require('moment'), Dispatch = require('../models/Dispatch').model(), authentication = require('./authentication');
var router = express.Router();
router.post('/response/:id', authentication.creditor, function (req, res, next) {
    Dispatch.findOneAndUpdate({_id: req.params.id, receiver: req.session.user._id}, {
        response: {
            style: Number(req.body.style),
            text: req.body.text
        }
    }, {new: true}, function (err, dispatch) {
        if (err) next(err);
        else if (!dispatch) {
            res.status(400).send({error: "Wrong dispatch id"});
        } else {
            res.send({
                _id: dispatch._id,
                name: dispatch.name,
                file: dispatch.file,
                date: moment(dispatch.date).format('YYYY-MM-DD'),
                response: dispatch.response
            });
        }
    });
});
module.exports = router;