/**
 * Created by gyz on 16/5/9.
 */
var authenticationGenerator = function (role) {
    return function (req, res, next) {
        if (!req.session.loggedIn || req.session.user.role != role) {
            var err = new Error("权限不足");
            err.status = 401;
            next(err);
        }
        next();
    }
};
exports.admin = authenticationGenerator(2);
exports.company = authenticationGenerator(3);
exports.accountant = authenticationGenerator(4);