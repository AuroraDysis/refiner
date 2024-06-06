export type InstructionName =
  | "basicProofread"
  | "awkwardParts"
  | "streamline"
  | "polish"
  | "trim"
  | "clarityAndFlow"
  | "significantClarityAndFlow"
  | "emailText"
  | "chatMessageText"
  | "academicText";

export interface InstructionGroup {
  groupName: string;
  emoji: string;
  instructions: Instruction[];
}

export interface Instruction {
  name: InstructionName;
  title: string;
  prompt: string;
  emoji: string;
}

export const instructionGroups: InstructionGroup[] = [
  {
    groupName: "Proofread",
    emoji: "🔍",
    // Proofread this 你可以从这个最基本的校稿指令开始。
    // Fix only awkward parts 仅作些许编辑, 修正非英语母语人士常犯的错误, 包括用词、语法和逻辑。
    // Streamline any awkward words or phrases 精简和梳理不通顺之处, 使整体内容更清晰。
    // Polish any awkward words or phrases 更积极地编辑和润饰, 修改程度更高
    // Trim the fat 如果文本太过冗长, 这能修正饶口的语句和删除赘字, 缩短文本约10%。
    // Proofread this and improve clarity and flow
    // Proofread this, significantly improving clarity and flow
    instructions: [
      {
        name: "basicProofread",
        title: "最基本的校稿指令",
        prompt: "Proofread this text",
        emoji: "🔍",
      },
      {
        name: "awkwardParts",
        title:
          "仅作些许编辑, 修正非英语母语人士常犯的错误, 包括用词、语法和逻辑",
        prompt: "Fix only awkward parts",
        emoji: "🔍",
      },
      {
        name: "streamline",
        title: "精简和梳理不通顺之处, 使整体内容更清晰",
        prompt: "Streamline any awkward words or phrases",
        emoji: "🔍",
      },
      {
        name: "polish",
        title: "更积极地编辑和润饰, 修改程度更高",
        prompt: "Polish any awkward words or phrases",
        emoji: "🔍",
      },
      {
        name: "trim",
        title: "如果文本太过冗长",
        prompt: "Trim the fat",
        emoji: "🔍",
      },
      {
        name: "clarityAndFlow",
        title: "Improve clarity and flow",
        prompt: "Improve clarity and flow",
        emoji: "🔍",
      },
      {
        name: "significantClarityAndFlow",
        title: "Significantly improving clarity and flow",
        prompt: "Significantly improving clarity and flow",
        emoji: "🔍",
      },
    ],
  },
  {
    groupName: "Context",
    emoji: "📚",
    instructions: [
      {
        name: "emailText",
        title: "Email",
        prompt: "email text",
        emoji: "📧",
      },
      {
        name: "chatMessageText",
        title: "Chat Message",
        prompt: "chat message text",
        emoji: "💬",
      },
      {
        name: "academicText",
        title: "Academic",
        prompt: "academic text",
        emoji: "🎓",
      },
    ],
  },
];

export const instructions: Instruction[] = instructionGroups.flatMap(
  (group) => group.instructions
);

export function getInstructions(
  instructionNames: InstructionName[]
): Instruction[] {
  return instructions.filter((instruction) =>
    instructionNames.includes(instruction.name)
  );
}
