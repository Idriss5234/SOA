const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json({ status: false });
    }

    jwt.verify(token, "12345678", async (err, data) => {
        if (err) {
            return res.json({ status: false });
        } else {
            const user = await User.findById(data.id);
            if (user) {
                return res.json({ status: true, user: user.name });
            } else {
                return res.json({ status: false });
            }
        }
    });
};
