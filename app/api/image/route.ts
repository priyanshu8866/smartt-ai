import { auth } from "@clerk/nextjs";
import { NextResponse, NextRequest } from "next/server";
import Configuration from "openai";
import OpenAIAPI from "openai";

import { checkSubscription } from "@/lib/subscription";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIAPI(); // Assuming you want to create an instance of OpenAIAPI

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    // ... (rest of your code)

    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    // ... (rest of your code)

    return NextResponse.json(response.data);
  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
