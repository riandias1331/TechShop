"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = (0, express_1.Router)();
const userControllerMongo = __importStar(require("../controllers/user.mogo.controller"));
const userControllerPostgres = __importStar(require("../controllers/user.postgres"));
const auth = __importStar(require("../middlewares/auth"));
const validator_1 = __importDefault(require("../utils/validator"));
// Mongo
//Private Routes
route.get('/mongo', auth.authMiddleware, userControllerMongo.getUserAll);
route.get('/mongo/:id', auth.authMiddleware, userControllerMongo.getUser);
route.put('/mongo', auth.authMiddleware, validator_1.default, userControllerMongo.updateUser);
route.delete('/mongo/:id', auth.authMiddleware, userControllerMongo.deleteUser);
route.delete('/mongo', auth.authMiddleware, userControllerMongo.deleteUserAll);
//Public Routes
route.post('/mongo', validator_1.default, userControllerMongo.createUser);
route.post('/api/register', validator_1.default, userControllerMongo.register);
route.post('/api/login', userControllerMongo.login);
// postgres
//Private
route.get("/postgres", auth.authMiddleware, userControllerPostgres.getAllUsers);
route.get("/postgres/:id", auth.authMiddleware, userControllerPostgres.getUserById);
route.put("/postgres", auth.authMiddleware, validator_1.default, userControllerPostgres.updateUser);
route.delete("/postgres", auth.authMiddleware, userControllerPostgres.deleteAll);
route.delete("/postgres/:id", auth.authMiddleware, userControllerPostgres.deleteUser);
//Public
route.post("/postgres", validator_1.default, userControllerPostgres.createUser);
exports.default = route;
