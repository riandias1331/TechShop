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
exports.login = exports.register = exports.deleteUserAll = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUserAll = void 0;
const model_mongo_1 = __importDefault(require("../models/model.mongo"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUserAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield model_mongo_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUserAll = getUserAll;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield model_mongo_1.default.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }
        const user = yield model_mongo_1.default.create({ name, email, password });
        // Gera o token JWT
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('token:', token, user);
        res.status(201).json({ message: 'User created successfully', token, user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const userUpdated = req.body;
        const user = yield model_mongo_1.default.findByIdAndUpdate(userId, userUpdated, { new: true });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield model_mongo_1.default.findByIdAndDelete(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteUser = deleteUser;
const deleteUserAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_mongo_1.default.deleteMany();
        if (!user) {
            return res.status(400).json({ message: "Users not found" });
        }
        res.status(200).json({ message: "Users  deleted" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteUserAll = deleteUserAll;
//
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUser = yield model_mongo_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }
        const user = yield model_mongo_1.default.create({
            name,
            email,
            password
        });
        console.log(user);
        // res.status(201).json(user)
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.register = register;
// export const login = async (req: Request, res: Response) => {
//     try {
//         const { email, password } = req.body as { email: string, password: string }
//         const user = await User.findOne({ email });
//         if (!user) {
//             console.log('Invalid email ')
//             return res.status(400).json({ error: 'User not found' });
//         }
//         console.log('Login successfully:', user);
//         res.status(200).json({ message: 'Login successfully', user });
//     } catch (error) {
//         res.status(400).json({ message: (error as Error).message })
//     }
// }
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield model_mongo_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }
        // Verifica a senha (você precisa adicionar bcrypt.compare)
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Senha incorreta' });
        }
        // GERA O TOKEN JWT (você não está fazendo isso atualmente!)
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
        console.log('Login successfully:', user.email);
        // RETORNA O TOKEN PARA O FRONTEND
        res.status(200).json({
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.login = login;
