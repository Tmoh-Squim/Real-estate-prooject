import bcrypt from "bcrypt";


export const HashPassword = async(password:string)=>{
    try {
        const salt = 12;
        const hash = await bcrypt.hash(password,salt);
        return hash;
    } catch (error) {
        console.log(error)
    }
}

export const ComparePassword = async(password:string,hash:string)=>{
    try {
        return await bcrypt.compare(password,hash);
    } catch (error) {
        console.log(error)
    }
}