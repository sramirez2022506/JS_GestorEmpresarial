import Jwt from 'jsonwebtoken'
import Admin from '../Admin/admin.model'

export const validateJWT = async (req, res, next) =>{
    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            msg: "There is not token"
        });
    }
    try{
        const {uid} = Jwt.verify(token, process.env.privateKey);
        const admin = await Admin.findById(uid);

        if(!admin){
            return res.status(401).json({
                msg: "The admin does not exist in the database"
            });
        }

        req.admin = admin;
        next();
    }catch(e){
        console.log(e),
        res.status(401).json({
            msg: "Invalid token"
        });
    }
}
