"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorController = void 0;
class ErrorController {
    exception(err, req, res, next) {
        console.error(err);
        res.status(500).json({ success: false, error: "EXCEPTION_THROWN" });
    }
    notFound(req, res) {
        res.status(404).json({ success: false, error: "NOT_FOUND" });
    }
}
exports.ErrorController = ErrorController;
//# sourceMappingURL=error-controller.js.map