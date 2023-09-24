import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";


export const GET = async(req,{params}) => {
    try {
        await connectToDB();
        console.log("params" + params.id)
        const prompts = await Prompt.find({
            creator : params.id
        }).populate('creator')
        
        return new Response(JSON.stringify(prompts) , {
            status : 200
        })
    } catch (error) {
        return new Response("Nothing here" , {
            status : 500
        })
    }
}