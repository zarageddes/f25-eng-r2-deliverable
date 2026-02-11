/* eslint-disable */
// TODO: Import whatever service you decide to use. i.e. `import OpenAI from 'openai';`
import OpenAI from "openai";

// HINT: You'll want to initialize your service outside of the function definition

// TODO: Implement the function below
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateResponse(message: string): Promise<string> {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful chatbot that only answers questions about animals and species. If a question is unrelated, politely say you only handle animal-related questions.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return completion.choices[0]?.message?.content ?? "No response.";
  } catch (error) {
    console.error(error);
    return "Sorry, something went wrong.";
  }
}
