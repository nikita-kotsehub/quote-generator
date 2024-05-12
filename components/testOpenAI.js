const OpenAI = require('openai');

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw Error("OPENAI_API_KEY is not set")
}

const openai = new OpenAI({
  apiKey: apiKey
})

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();