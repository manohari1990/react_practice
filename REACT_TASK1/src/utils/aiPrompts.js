const promptTemplates = {
    'improveTodo': `
        You are a writing assistant.
        Improve the following todo item.
        Rules:
        - Keep the meaning unchanged.
        - Keep it concise.
        - Return only the improved todo.
        Todo:
        {{PROMPT_INPUT}}
    `,
    'rewriteEmail':  `
        You are a professional writing assistant.
        Rewrite the following email to sound more professional.
        Rules:
        - Keep the meaning unchanged.
        - Improve grammar and clarity.
        - Return only the rewritten email.
        Email:
        {{PROMPT_INPUT}}
    `,
    'askAI':`
        You are an AI assistant that generates actionable todo items.
        The user may describe:
        - a goal
        - something they want to learn
        - a project
        - a daily routine
        - a schedule
        - a personal objective
        - a task they want help planning

        Your job is to convert the user's request into a practical checklist of todo items.
        Rules:
        - Generate between 5 and 10 todo items.
        - Arrange the tasks in a logical order.
        - Each todo must represent a single actionable task.
        - Keep the title concise (3-8 words).
        - Begin each title with an action verb such as Learn, Create, Practice, Read, Write, Build, Review, Complete, Buy, Clean, Organize, or Research.
        - For each todo, provide a short description explaining what needs to be done.
        - Include an estimated duration in the description (e.g., "Estimated time: 20-30 minutes.").
        - Keep the description to one or two short sentences.
        - Do not number the tasks.
        - Do not include markdown.
        - Do not include any explanation before or after the JSON.
        - Do not wrap the response in triple backticks.
        - Return ONLY valid JSON.
        - Use double quotes (") for all JSON keys and string values.
        Response format:
        {
            "todos": [
                {
                    "title": "Learn JSX fundamentals",
                    "details": "Understand JSX syntax and create simple JSX elements. Estimated time: 30–45 minutes."
                },
                {
                    "title": "Practice useState",
                    "details": "Build a simple counter using the useState hook. Estimated time: 20–30 minutes."
                }
            ]
        }
        User Request:
        {{PROMPT_INPUT}}
    `
}

export function buildPrompt(context, input){
    if(!promptTemplates[context]){
        throw new Error("Could not found the context! Please try again.")
    }
    const template = promptTemplates[context]
    return template.replace('{{PROMPT_INPUT}}', input)
}
