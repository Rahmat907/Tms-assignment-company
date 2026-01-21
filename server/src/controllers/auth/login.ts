

interface User{
    username: String,
    email: String,
    password: String
} 

const ragisterUser = async(req:any,res:any)=>{
        const {username,email,password}:User = req.body
        if(!username || !email || !password){
            return res.status(401).json({
                success: false,
                message : "Please fill all the colums"
            })
        }
}