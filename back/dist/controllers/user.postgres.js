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
exports.deleteAll = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const model_postgres_1 = require("../models/model.postgres");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Função auxiliar com tipagem
const handleResponse = (res, status, message, data, token) => {
    const response = Object.assign({ status,
        message,
        data }, (token && { token }));
    res.status(status).json(response);
};
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            handleResponse(res, 400, 'Name and email are required');
            return;
        }
        const user = yield (0, model_postgres_1.createUserService)(name, email, password);
        // Gera o token JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('token:', token, user);
        console.log('User created', 'token:', token, user);
        handleResponse(res, 201, 'User created successfully', user, token);
    }
    catch (error) {
        console.error('Error in createUser:', error);
        handleResponse(res, 500, 'Error creating user');
    }
});
exports.createUser = createUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, model_postgres_1.getAllUsersService)();
        handleResponse(res, 200, 'Users fetched successfully', users);
    }
    catch (error) {
        console.error('Error in getAllUsers:', error);
        handleResponse(res, 500, 'Error fetching users');
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, model_postgres_1.getUserByIdService)(parseInt(id));
        if (!user) {
            handleResponse(res, 404, 'User not found');
            return;
        }
        handleResponse(res, 200, 'User fetched successfully', user);
    }
    catch (error) {
        console.error('Error in getUserById:', error);
        handleResponse(res, 500, 'Error fetching user');
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const updatedUser = yield (0, model_postgres_1.updateUserService)(parseInt(id), name, email, password);
        if (!updatedUser) {
            handleResponse(res, 404, 'User not found');
            return;
        }
        handleResponse(res, 200, 'User updated successfully', updatedUser);
    }
    catch (error) {
        console.error('Error in updateUser:', error);
        handleResponse(res, 500, 'Error updating user');
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedUser = yield (0, model_postgres_1.deleteUserService)(parseInt(id));
        if (!deletedUser) {
            handleResponse(res, 404, 'User not found');
            return;
        }
        handleResponse(res, 200, 'User deleted successfully', deletedUser);
    }
    catch (error) {
        console.error('Error in deleteUser:', error);
        handleResponse(res, 500, 'Error deleting user');
    }
});
exports.deleteUser = deleteUser;
const deleteAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield (0, model_postgres_1.deleteUserAllService)();
        // Verificação mais segura da estrutura de retorno
        if (!deleted || typeof deleted.count !== 'number') {
            handleResponse(res, 500, 'Invalid response from delete operation');
            return;
        }
        if (deleted.count === 0) {
            handleResponse(res, 404, 'No users found to delete');
            return;
        }
        console.log('All users deleted:', deleted.count);
        handleResponse(res, 200, `All users (${deleted.count}) were deleted successfully`, {
            deletedCount: deleted.count,
            deletedUsers: deleted.users
        });
    }
    catch (error) {
        if (error instanceof Error && error.message === "Operation not allowed in production") {
            handleResponse(res, 403, error.message);
            return;
        }
        console.error('Error in deleteAll:', error);
        handleResponse(res, 500, 'Error deleting all users');
    }
});
exports.deleteAll = deleteAll;
