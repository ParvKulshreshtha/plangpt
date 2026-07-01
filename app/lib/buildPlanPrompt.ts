import { AnswerFormatItem, PlanInfo } from "../data/planData";

export function buildPlanPrompt(
  plan: PlanInfo,
  userMessage: string,
  selectedSectionIds: string[]
): string {
  const selectedSections = plan.answerFormat.filter((item) =>
    selectedSectionIds.includes(item.id)
  );

  const formatInstructions = selectedSections
    .map((item) => describeFormatItem(item))
    .join("\n");

  return `${plan.initialPrompt}

The user said: "${userMessage}"

Respond with detailed, helpful information for these sections only:
${selectedSections.map((s) => `- ${s.label} (${s.id})`).join("\n")}

Structure your response using this exact format for each section:
${formatInstructions}

Use markdown. For custom sections, use the specified JSON block format so the UI can render them.`;
}

function describeFormatItem(item: AnswerFormatItem): string {
  switch (item.type) {
    case "heading":
      return `[${item.id}] Use ## ${item.label} as a markdown heading, followed by relevant content.`;
    case "para":
      return `[${item.id}] Write a clear paragraph under the heading for "${item.label}".`;
    case "custom":
      return `[${item.id}] "${item.label}" — render as ${item.format} using this JSON block:
\`\`\`json:${item.id}
{ "format": "${item.format}", "title": "${item.label}", "data": ... }
\`\`\`
For table: data = { "headers": string[], "rows": string[][] }
For cards: data = { "items": [{ "title": string, "description": string }] }
For checklist: data = { "items": string[] }`;
  }
}
