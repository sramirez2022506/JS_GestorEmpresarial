import bcryptjs from 'bcryptjs';
import Administrator from '../Admin/admin.model.js';
import {generateJWT} from '../helpers/generate-jwt.js';

export const login = async (req, res) =>{
    const {email, password} = req.body;

    try{
        const admin = await Administrator.findOne({email});

        if(!admin){
            return res.status(400).json({
                msg: "Incorrect credentials"
            });
        }

        const validateKey = bcryptjs.compareSync(password, admin.password);
        if(!validateKey){
            return res.status(400).json({
                msg: "Incorrect password"
            });
        }

        const token = await generateJWT(admin.id);

        res.status(200).json({
            msg: "Welcome!!!",
            admin,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Please communicate with the admin"
        });
    }
}