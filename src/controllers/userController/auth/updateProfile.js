const { User } = require('../../../models/authModels');
const updateProfile = async (req, res) => {
    try {
        const user = req.user;
        const { name, number, address, gstNumber } = req.body;


        const updatedUser = {};
        if (name) {
            updatedUser.name = name;
        }
        if (number) {
            const existingUser = await User.findOne({ number });
            if (existingUser) {
                return res.status(400).json({ message: "Number already exists" });
            }
            updatedUser.number = number;
        }
        if (address) {
            updatedUser.address = address;
        }
        if (gstNumber) {
            const existingUser = await User.findOne({ gstNumber });
            if (existingUser) {
                return res.status(400).json({ message: "GST number already exists" });
            }
            updatedUser.gstNumber = gstNumber;
        }

        if (req?.files?.avtar) {
            const avtar = req.files.avtar[0].path;
            updatedUser.avtar = avtar;
        }

        await User.findOneAndUpdate({ _id: user._id }, updatedUser, { new: true });
        return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = updateProfile;
