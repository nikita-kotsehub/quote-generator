import { NextRequest, NextResponse } from "next/server";
import openai from "@/app/utils/openai"

export async function POST(request: NextRequest) {
    const body = await request.json()
    const userQuery = body.userQuery

    const chatCompletion = await openai.chat.completions.create({
        messages: [
            {
                role: 'user',
                content:
                    `Return a famous quote, its author, and the year. Make sure to return it
                    in JSON format with these properties: quoteText, quoteAuthor, quoteYear. 
                    Make the quote be related to the following user query: ${userQuery}`
            }
        ],
        model: 'gpt-3.5-turbo',
    });

    const responseText = chatCompletion.choices[0].message.content;
    const responseObject = JSON.parse(responseText || "")

    
    return NextResponse.json(responseObject);
}