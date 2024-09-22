const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

// Checks the headers for an Authorization header (Bearer <token>)
// Verifies that the token is valid
// Puts the userId in the request object
// if the token checks out.
// If not, return a 403 status back to the user

export const authMiddleware = async (res, req, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(403).json({});
  }

  const token = authHeader.split("")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(403).json({});
  }
};

module.exports = {
  authMiddleware,
};
