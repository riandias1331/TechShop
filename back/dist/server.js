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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = __importDefault(require("./config/db"));
const createUserTable_1 = __importDefault(require("./data/createUserTable"));
const routes_1 = __importDefault(require("./routes/routes"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const path_1 = __importDefault(require("path"));
// Config
dotenv_1.default.config();
const app = (0, express_1.default)();
// const port: string | number = process.env.PORT || 8080
const port = process.env.PORT ? Number(process.env.PORT) : 8080;
// Middlewares
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    // origin: 'http://localhost:5173',
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Servir arquivos estáticos (opcional, para success.html ou frontend build)
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
// Routes
app.use(routes_1.default);
// Error Handler
app.use(errorHandler_1.default);
// DataBase Mongodb
mongoose_1.default.connect(process.env.MONGO_URL)
    .then(() => {
    console.log("DataBase is connected");
    app.emit("DataBase");
})
    .catch((error) => {
    console.log(error);
});
// Databse Postgres
(0, createUserTable_1.default)();
app.get('/test-error-pg', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("SELECT current_database()");
    res.send(`The database name is : ${result.rows[0].current_database}`);
}));
// Server
app.on("DataBase", () => {
    app.listen(port, "0.0.0.0", () => {
        console.log(`Server is running in localhost:${port}`);
    });
});
