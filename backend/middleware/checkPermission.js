export const checkPermission = (permission) => {
    return (req, res, next) => {
        if (req.user.role === "superadmin" || req.user.permissions.includes(permission)) {
            next();
        } else {
            res.status(403).json({ message: "Access denied" });
        }
    };
};
