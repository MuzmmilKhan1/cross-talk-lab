"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLoggedIn = void 0;
function checkLoggedIn(req, res, next) {
    if (req.session.isLoggedIn)
        next();
    else
        res.json({ error: "UNAUTHENTICATED", success: false });
}
exports.checkLoggedIn = checkLoggedIn;
//# sourceMappingURL=check-loggedin.js.map