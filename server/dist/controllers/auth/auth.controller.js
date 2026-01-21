import AuthServices from "../../services/auth.service.js";
class AuthController {
    static signup = async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const existingUser = await AuthServices.findUserbyEmail(email);
            if (existingUser)
                res.status(400).json({
                    success: false,
                    message: "user already exists"
                });
            const user = await AuthServices.ragisterUser(username, email, password);
            res.status(201).json({
                success: true,
                message: "user created successfully",
                data: user
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };
}
export default AuthController;
//# sourceMappingURL=auth.controller.js.map