const jwt = require("jsonwebtoken")
const SECRET = process.env.JWT_SECRET
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) return res.status(401).json({ error: "No token provided" })

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid or expired token" })
    req.user = decoded // attach decoded payload (userId, role, etc.)
    next()
  })
}

function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" })
    }

    next()
  }
}

function requireSelfOrRole(...allowedRoles) {
  return (req, res, next) => {
    const isSelf = req.user?.id === req.params.userId
    const hasRole = allowedRoles.includes(req.user?.role)

    if (!isSelf && !hasRole) {
      return res.status(403).json({ message: "Forbidden" })
    }

    next()
  }
}

function validateMongoIdParam(paramName) {
  return (req, res, next) => {
    const value = req.params[paramName]

    if (!/^[0-9a-fA-F]{24}$/.test(value)) {
      return res.status(400).json({ message: "Invalid user id" })
    }

    next()
  }
}
module.exports = {
  authMiddleware,
  requireRole,
  requireSelfOrRole,
  validateMongoIdParam,
}
