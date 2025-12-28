"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserAllService = exports.deleteUserService = exports.updateUserService = exports.createUserService = exports.getUserByIdService = exports.getAllUsersService = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("SELECT * FROM users");
    return result.rows;
});
exports.getAllUsersService = getAllUsersService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0] || null;
});
exports.getUserByIdService = getUserByIdService;
const createUserService = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, password]);
    return result.rows[0];
});
exports.createUserService = createUserService;
const updateUserService = (id, name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *", [name, email, password, id]);
    return result.rows[0] || null;
});
exports.updateUserService = updateUserService;
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    return result.rows[0] || null;
});
exports.deleteUserService = deleteUserService;
const deleteUserAllService = () => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV === 'production') {
        throw new Error("Operation not allowed in production");
    }
    const result = yield db_1.default.query("DELETE FROM users RETURNING *");
    return {
        count: result.rowCount || 0,
        users: result.rows || []
    };
});
exports.deleteUserAllService = deleteUserAllService;
