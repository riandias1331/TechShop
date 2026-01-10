"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Token not provided.' });
    }
    try {
        const secret = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
};
exports.authMiddleware = authMiddleware;
// auth.ts - Adicione esta função
const optionalAuth = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (token) {
        try {
            const secret = process.env.JWT_SECRET;
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            req.user = decoded;
        }
        catch (error) {
            // Token inválido, mas não bloqueia a rota
            console.log('Token inválido ou expirado');
        }
    }
    next();
};
exports.optionalAuth = optionalAuth;
