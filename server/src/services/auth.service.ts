import prisma from "../config/db.js";
import bcrypt from "bcryptjs";

interface User {
      username: string
    email: string
    password: string
}

class AuthServices {
  static ragisterUser = async (
    username: string,
    email: string,
    password: string,
  ):Promise<User> => {
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
  static  findUserbyEmail = async (email :string)=>{
        return prisma.user.findUnique({where:{email}})
  }
}

export default AuthServices;