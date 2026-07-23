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
    `
}

export function buildPrompt(context, input){
    if(!promptTemplates[context]){
        throw new Error("Could not found the context! Please try again.")
    }
    const template = promptTemplates[context]
    return template.replace('{{PROMPT_INPUT}}', input)
}
