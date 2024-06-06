import OpenAI from "openai";
import { Instruction } from "./instructions";

import LanguageDetect from "languagedetect";
import { guessLanguage } from "../guessLanguage";
import { trackRefine } from "../tracker";
import { titleCase } from "../strings";
import { getCustomPrompts } from "./customPrompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});
const model = process.env.OPENAI_MODEL || "gpt-3.5-turbo";

export const languageDetector = new LanguageDetect();

export async function openAIRefineText(
  text: string,
  instructions: Instruction[]
): Promise<string> {
  const languageName = guessLanguage(text);
  // end as Text
  const context = instructions.filter(x => x.name.endsWith("Text")).map(x => x.prompt);
  if (context.length === 0) {
    context.push("text");
  }
  let prompt_instruction = formatInstructions(instructions.filter(x => !x.name.endsWith("Text")));
  if (prompt_instruction.length !== 0) {
    prompt_instruction = ", " + prompt_instruction;
  }
  const user_prompt = `Proofread this ${context[0]}${prompt_instruction}`;

  const completion = await openai.chat.completions.create({
    model,
    temperature: 0,
    messages: [
      { role: "user", content: `${user_prompt}: "${text}"` },
    ],
  });

  const refined = completion.choices[0].message?.content || "";
  await trackRefine(text, user_prompt, refined, instructions, languageName);
  return refined;
}

function getLanguageInstruction(languageName: string | undefined): string {
  const fallbackInstruction =
    "Keep the output language the same as the input language.";
  if (!languageName) {
    return fallbackInstruction;
  }
  return `Keep ${titleCase(
    languageName
  )} as the output language (the same as the input language).`;
}

function formatInstructions(instructions: Instruction[]): string {
  return instructions
    .map((instruction) => {
      return `${instruction.prompt}`;
    })
    .join(", ");
}
