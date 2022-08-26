import instance from "./instance";
import User from "../model/user";
export const signup = (user:User)=>{
    return instance.post('/signup',user)
}
export const signin = (user:User)=>{
    return instance.post('/signin',user)
}
