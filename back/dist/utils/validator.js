"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required()
});
const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        res.status(400).json({
            status: 400,
            message: error.details[0].message
        });
        return;
    }
    next();
};
exports.default = validateUser;
