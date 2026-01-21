const ragisterUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(401).json({
            success: false,
            message: "Please fill all the colums"
        });
    }
};
export {};
//# sourceMappingURL=login.js.map