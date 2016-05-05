var express = require('express'), bcrypt = require('bcrypt'), User = require('../models/User').model();
var router = express.Router();

/* GET users listing. */
router.get('/register', function (req, res, next) {
    var username = decodeURIComponent(req.query.username);
    User.find({username: username}, function (err, users) {
        if (err) next(err);
        if (users.length === 0) {
            bcrypt.genSalt(12, function (err, salt) {
                if (err) next(err);
                req.session.salt1 = salt;
                res.send({salt1: salt});
            });
        } else {
            res.status(401).send({error: "用户名已存在"});
        }
    });
});
router.post('/register', function (req, res, next) {
    var clientSalt = req.body.salt1, serverSalt = req.session.salt1;
    delete req.session.salt1;
    if (!serverSalt || clientSalt !== serverSalt) {
        res.status(409).send({error: "salt not equal"});
    }
    User.find({username: req.body.username}, function (err, users) {
        if (err) next(err);
        if (users.length === 0) {
            var user = new User();
            user.username = req.body.username;
            user.password = req.body.password;
            user.salt = serverSalt;
            user.role = 1;
            user.save(function (err, user) {
                if (err) next(err);
                req.session.loggedIn = true;
                req.session.user = user;
                res.send(user);
            });
        } else {
            res.status(409).send({error: "用户名已存在"});
        }
    })
});
router.get('/login', function (req, res, next) {
    var username = decodeURIComponent(req.query.username);
    User.find({username: username}, function (err, users) {
        if (users.length === 0) {
            res.status(401).send({error: "密码错误或该用户不存在"});
        } else {
            var user = users[0];
            bcrypt.genSalt(8, function (err, salt) {
                bcrypt.hash(user.password, salt, function (err, hash) {
                    if (err) next(err);
                    req.session.salt2 = salt;
                    req.session.hash = hash;
                    req.session.user = user;
                    res.send({salt1: user.salt, salt2: salt});
                });
            });
        }
    });
});
router.post('/login', function (req, res, next) {
    var user = req.session.user, clientSalt1 = req.body.salt1, serverSalt1 = user.salt, clientSalt2 = req.body.salt2, serverSalt2 = req.session.salt2, clientUsername = req.body.username, serverUsername = user.username, clientHash = req.body.hash, serverHash = req.session.hash;
    delete req.session.salt2;
    delete req.session.hash;
    if (!serverSalt1 || !serverSalt2 || clientSalt1 !== serverSalt1 || clientSalt2 !== serverSalt2 || !serverUsername || !serverHash) {
        delete req.session.user;
        res.status(401).send({error: "salt not equal"});
    } else if (clientUsername != serverUsername || clientHash != serverHash) {
        delete req.session.user;
        res.status(401).send({error: "密码错误或该用户不存在"});
    } else {
        req.session.loggedIn = true;
        res.send(user);
    }
});

module.exports = router;
