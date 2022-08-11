const UserRepository=require('../repositories/user.repository');

class UserService{
    userRepository=new UserRepository();
    getUser=async(nickname,password)=>{
        let user=await this.userRepository.getUser(nickname);
        if(user===null||password!=user.password){
            return null; 
        }
        return user;
    }
    createUser=async(nickname,password)=>{
        let createUser=await this.userRepository.createUser(nickname,password);
        return createUser;
    }
}

module.exports=UserService;