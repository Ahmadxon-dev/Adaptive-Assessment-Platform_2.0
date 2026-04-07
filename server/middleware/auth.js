const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET
function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "No token provided" });

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Invalid or expired token" });
        req.user = decoded; // attach decoded payload (userId, role, etc.)
        next();
    });
}

module.exports = authMiddleware