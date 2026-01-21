interface User {
    username: string;
    email: string;
    password: string;
}
declare class AuthServices {
    static ragisterUser: (username: string, email: string, password: string) => Promise<User>;
    static findUserbyEmail: (email: string) => Promise<any>;
}
export default AuthServices;
//# sourceMappingURL=auth.service.d.ts.map