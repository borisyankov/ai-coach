import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { workoutPlanSchema } from "./schema";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { experience, duration, frequency } = await req.json();
  const prompt = `You are an experienced personal trainer. I want to train in a gym. Give me a list of exercises, by day of the week. I am ${experience}, the exercise should be ${duration} long, I will train ${frequency} times a week.`;
  const result = await streamObject({
    model: openai("gpt-4o"), // openai('gpt-4o-2024-08-06', { structuredOutputs: true })
    schema: workoutPlanSchema,
    prompt,
  });
  return result.toTextStreamResponse();
}
