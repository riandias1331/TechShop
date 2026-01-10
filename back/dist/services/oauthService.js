"use strict";
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
