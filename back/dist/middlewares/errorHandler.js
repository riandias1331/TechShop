"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandling = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong',
        error: err.message
    });
};
exports.default = errorHandling;
