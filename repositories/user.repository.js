const {User}=require('../models')

class userRepository{
    getUser=async(nickname)=>{
        const getUser=await User.findOne({
            where:{
                "nickname":nickname,
            },
        });
        try {
            return getUser.dataValues;
        } catch (error) {
            return null;            
        }
    }
    createUser=async(nickname,password)=>{
        const createUser=await User.create({
            nickname,
            password
        })
        return createUser;
    }
}
module.exports=userRepository;