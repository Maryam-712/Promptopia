import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";


export const GET = async (request, {params}) => {
    try {
         const { id } = await params;
        await connectToDB();
        const prompt= await Prompt.findById(id).populate('creator');
        if(!prompt)return new Response("Prompt not found",{status:404})
        return new Response(JSON.stringify(prompt),{status:200})
    } catch (error) {
        return new Response("Failed to fetch all prompts",{status:500})
    }
}


export const PATCH = async (request, {params}) => {
    try {
         const { id } = await params;
         const { prompt, tag } = await request.json(); // ADD THIS LINE

        await connectToDB();
        const existingPrompt= await Prompt.findById(id).populate('creator');
        if(!existingPrompt)return new Response("Prompt not found",{status:404})
        
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

         return new Response(JSON.stringify(existingPrompt),{status:200})
    } catch (error) {
        console.error("PATCH /api/prompt/[id] error:", error);
        return new Response("Failed to update prompt",{status:500})
    }
}

export const DELETE = async (request, {params}) => {
    try {
         const { id } = await params;
        await connectToDB();
        
        await Prompt.findByIdAndDelete(id);
         return new Response("Prompt deleted successfully",{status:200})
       
    } catch (error) {
        return new Response("Failed to delete prompt",{status:500})
    }
}
