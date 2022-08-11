const { User } = require('../routes');
const UserService=require('../services/user.service');
const jwt=require('jsonwebtoken');
class UserController{
    userService=new UserService();
    checkUser=async(req,res)=>{
        console.log(res.locals.user)
        return res.status(200).send(res.locals.user) 
    }
    loginUser=async (req, res) => {
        const {nickname,password}=req.body;
        const user=await this.userService.getUser(nickname,password);
        if(user===null){
            return res.status(400).send("사용자ID 또는 암호가 올바르지 않습니다.") 
        }
        const token=jwt.sign({ userId: user.userId }, "boardkey")
        res.cookie('Bearer',token,{maxAge: 360000})
        res.send({
            token:token,
        });
    }
    signupUser=async(req,res)=>{
        const {
            nickname,
            password,
            currentpw
        }=req.body;
        const exist=await this.userService.getUser(nickname,password);
        if(exist!==null){
            return res.status(400).send("message:EXEIST_NICKNAME")
        }
        if(password!=currentpw){
            return res.status(400).send("message:NONE_CURRENT_PW")
        }
        const regExp=/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
        if(nickname.length<3 || regExp.test(nickname)){
            return res.status(400).send("message:WRONG_NICKNAME")
        }else if(password.length<4 || password.includes(nickname)){
            return res.status(400).send("message:WRONG_PASSWORD")
        }else{
            await this.userService.createUser(nickname,password);
        }
        return res.status(201).send("가입성공");
    }
}

module.exports=UserController