const profile = async(req, res, next)=>{
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        return res.status(200).json({
            status: true,
            message: "User profile",
            user: user,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
    
}

module.exports = profile;