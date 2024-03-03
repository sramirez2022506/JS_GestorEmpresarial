import Jwt from 'jsonwebtoken';

export const generateJWT = (uid= '')=>{
    return new promise((resolve, reject) =>{
        const payload = {uid};
        Jwt.sign(
            payload,
            process.env.privateKey,
            {
                expiresIn: '2h'
            },
        (err, token) => {
            err ? (console.log(err), reject('The token cant be generated')): resolve(token);
        }
        )
    });
}