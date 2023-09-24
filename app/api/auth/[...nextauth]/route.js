import nextAuth from "next-auth";
import NextAuth from "next-auth/next";
import GoogeeProvider from "next-auth/providers/google"
import { connectToDB } from "@utils/database";
import User from "@models/User";




const handler = nextAuth({
    providers : [
        GoogeeProvider({
            clientId : process.env.GOOGLE_ID,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks : {
        async redirect({ url, baseUrl }) 
        { return baseUrl },
        async session({session}){
            console.log("email" , session.user.email)
            const sessionUser = await User.findOne({
                email : session.user.email
            })
            console.log("user" , sessionUser)
    
    
            session.user.id = sessionUser._id.toString();
    
    
            return session;
        },
        async signIn({profile})
        {
            try {
               await connectToDB();
            const userExists = await User.findOne({
                email : profile.email
            })
    
    
            if(!userExists)
            {
                await User.create({
                    email : profile.email,
                    username : profile.name.replace(" ","").toLowerCase(),
                    image : profile.picture
                })

            }
            
            return true;
           } catch (error) {
            console.log(error)
            return false
           }
            
        }
    }
    
})

export {handler as GET , handler as POST};