// Validaciones con relacion entidad - base de datos
import User from '../src/user/user.model.js'

export const findUser = async(id)=>{
    try{
        const userExist = await User.findById(id)
        if(!userExist) return false
        return userExist
    }catch(err){
        console.error(err)
        return false
    }
}
