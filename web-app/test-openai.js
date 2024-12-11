require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testAssistantsAPI() {
  try {
    console.log('OpenAI version:', require('openai/package.json').version);

    // Check if assistants API is available
    const assistants = await openai.assistants.list(); // No beta usage
    console.log('Assistants:', assistants);

    // Create a thread
    const thread = await openai.threads.create(); // No beta usage
    console.log('Thread created:', thread);

    // Add a message to the thread
    const message = await openai.threads.messages.create(thread.id, {
      role: 'user',
      content: 'Hello, Assistant!',
    });
    console.log('Message added:', message);

    // Run the assistant
    const run = await openai.threads.runs.create(thread.id, {
      assistant_id: 'asst_62UtU1GlonQYJZP8grYbd4dK', // Your specific Assistant ID
      instructions: 'Please respond to the user\'s message.',
    });
    console.log('Run created:', run);

    // Check run status
    let runStatus = await openai.threads.runs.retrieve(thread.id, run.id);
    console.log('Run status:', runStatus);
  } catch (error) {
    console.error('Error:', error);
  }
}

testAssistantsAPI();
