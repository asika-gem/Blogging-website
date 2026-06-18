import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access denied. Not authenticated.",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = {
      id: payload.id || payload._id, // handle both cases
      role: payload.role,
      username: payload.username,
    };

    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
};
//admin or user  can access
export const allowSelfOrAdmin = (req, res, next) => {
  if (req.user.role === "admin" || req.user.id === req.params.id) {
    return next();
  }

  return res.status(403).json({
    message: "You are not allowed to do that!",
  });
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied: insufficient permissions",
      });
    }
    next();
  };
};
//router.get("/users", verifyToken, allowSelfOrAdmin/authorizeRoles("admin"), getUserById/getUsers);
