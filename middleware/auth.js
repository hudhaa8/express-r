import jwt from "jsonwebtoken"

// this is the custom middle ware , we can use wherever we want , just by include auth

export const auth=(request,response,next)=>{
    try{

        const token=request.header("x-auth-token")
    console.log(token)
    jwt.verify(token,process.env.SECRET_KEY)
    next()
    }
    catch(err) {
        response.status(401).send({error:err.message})
    }
}