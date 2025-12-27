import dotenv from "dotenv"
import express, { Express } from "express"
import mongoose from "mongoose"
import pool from './config/db'
import createUserTable from './data/createUserTable'
import routes from "./routes/routes"
import cors from "cors"
import errorHandler from './middlewares/errorHandler'
import path from "path"
import axios from "axios"

// Config
dotenv.config()
const app: Express = express()
// const port: string | number = process.env.PORT || 8080
const port = process.env.PORT ? Number(process.env.PORT) : 8080;

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Servir arquivos estáticos (opcional, para success.html ou frontend build)
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use(routes)

// // ========================================
// // GitHub OAuth
// // ========================================
// app.get("/auth/github", (req, res) => {
//   const redirectUri = `${req.protocol}://${req.get("host")}/auth/github/callback`;
//   const url = `https://github.com/login/oauth/authorize?client_id=${
//     process.env.GITHUB_CLIENT_ID
//   }&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user:email`;

//   res.redirect(url);
// });

// app.get("/auth/github/callback", async (req, res) => {
//   const code = req.query.code as string;

//   if (!code) {
//     return res.status(400).send("No code provided");
//   }

//   try {
//     const tokenResponse = await axios.post(
//       "https://github.com/login/oauth/access_token",
//       null,
//       {
//         params: {
//           client_id: process.env.GITHUB_CLIENT_ID,
//           client_secret: process.env.GITHUB_CLIENT_SECRET,
//           code,
//         },
//         headers: {
//           Accept: "application/json",
//         },
//       }
//     );

//     const accessToken = tokenResponse.data.access_token;

//     if (!accessToken) {
//       return res.status(400).send("Failed to get access token");
//     }

//     // Pega dados do usuário
//     const userResponse = await axios.get("https://api.github.com/user", {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     // Pega emails
//     const emailResponse = await axios.get("https://api.github.com/user/emails", {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     const primaryEmail = emailResponse.data.find(
//       (e: any) => e.primary && e.verified
//     );

//     console.log("✅ GitHub User:", {
//       name: userResponse.data.name || userResponse.data.login,
//       email: primaryEmail?.email || "No public email",
//       login: userResponse.data.login,
//     });

//     // Redireciona para o frontend com o token (ou crie uma sessão/JWT aqui)
//     res.redirect(`http://localhost:5173/?github_token=${accessToken}`);
//   } catch (err: any) {
//     console.error("GitHub OAuth error:", err.response?.data || err.message);
//     res.status(500).send("Authentication failed");
//   }
// });

// Error Handler
app.use(errorHandler)

// DataBase Mongodb
mongoose.connect(process.env.MONGO_URL as string)
    .then(() => {
        console.log("DataBase is connected")
        app.emit("DataBase")
    })
    .catch((error) => {
        console.log(error)
    })

// Databse Postgres
createUserTable()
app.get('/test-error-pg', async(req, res) => {
    const result = await pool.query("SELECT current_database()")
    res.send(`The database name is : ${result.rows[0].current_database}`)
})

// Server
app.on("DataBase", () => {
    app.listen(port, () => {
        console.log(`Server is running in localhost:${port}`)
    })
})