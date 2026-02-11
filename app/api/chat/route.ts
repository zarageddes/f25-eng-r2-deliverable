/* eslint-disable */

// TODO: Implement this file
import { generateResponse } from "@/lib/services/species-chat";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const body = await req.json();
  
      if (
        !body ||
        typeof body !== "object" ||
        !("message" in body) ||
        typeof body.message !== "string"
      ) {
        return NextResponse.json(
          { error: "Invalid request" },
          { status: 400 }
        );
      }
  
      const response = await generateResponse(body.message);
  
      return NextResponse.json({ response });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Upstream error" },
        { status: 502 }
      );
    }
  }