const Admin = require("../../../models/authModels");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
    try {
        const mustData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            number: req.body.number,
            role: req.body.role,

        }
        for (const key in mustData) {
            if (!mustData[key] || mustData[key] === "") {
                return res.status(400).json({
                    status: false,
                    message: `${key} is required`,
                });
            }
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);


        mustData.password = hashedPassword;
        const newAdmin = new Admin(mustData);

        await newAdmin.save();

        return res.status(201).json({
            status: true,
            message: "Admin registered successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

module.exports = register;