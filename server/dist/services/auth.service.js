import prisma from "../config/db.js";
import bcrypt from "bcryptjs";
class AuthServices {
    static ragisterUser = async (username, email, password) => {
        const hashPassword = bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashPassword,
            },
        });
        return user;
    };
    static findUserbyEmail = async (email) => {
        return prisma.user.findUnique({ where: { email } });
    };
}
export default AuthServices;
//# sourceMappingURL=auth.service.js.map