// Add your class Cloudflare Worker URL here. Never put an OpenAI API key in this file.
const workerUrl = "https://bitter-snow-738e.ewolde12.workers.dev/";
";

// Keep the conversation focused on L'Oréal products and beauty guidance.
const systemMessage = {
  role: "system",
  content:
    "You are a helpful L'Oréal beauty assistant. Only answer questions about L'Oréal products, skincare, makeup, haircare, fragrances, beauty routines, and product recommendations. If a question is unrelated, briefly say you can only help with L'Oréal beauty products and routines, then invite the user to ask a related question. Give clear, concise, balanced guidance. Do not invent product names, ingredients, or claims; say when you are unsure and suggest checking the product label or official L'Oréal information. For personalized recommendations, ask about relevant preferences or skin and hair needs, and avoid presenting advice as medical guidance.",
};

// Save successful messages so the assistant can follow the conversation.
const conversationHistory = [];

// Get the chat elements from the page.
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");
const sendBtn = document.getElementById("sendBtn");

// Add a message as text so user input is displayed safely.
function addMessage(className, text) {
  const message = document.createElement("div");
  message.className = `msg ${className}`;
  message.textContent = text;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return message;
}

// Show a greeting when the chat first opens.
addMessage("ai", "👋 Hello! How can I help you today?");

// Send each user message to the class Cloudflare Worker.
chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const message = userInput.value.trim();
  if (!message) {
    userInput.setCustomValidity("Please enter a message.");
    userInput.reportValidity();
    return;
  }
  userInput.setCustomValidity("");

  addMessage("user", message);
  userInput.value = "";
  userInput.disabled = true;
  sendBtn.disabled = true;
  const thinkingMessage = addMessage("ai", "Thinking…");

  try {
    if (workerUrl.includes("your-subdomain")) {
      throw new Error(
        "Add your class Cloudflare Worker URL near the top of script.js, then try again.",
      );
    }

    const response = await fetch(workerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          systemMessage,
          ...conversationHistory,
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();
    if (!response.ok || data.error) {
      throw new Error(
        (data.error && data.error.message) ||
          `The request failed (${response.status}).`,
      );
    }

    const reply =
      data.choices &&
      data.choices[0] &&
      data.choices[0].message &&
      data.choices[0].message.content;
    if (typeof reply !== "string" || !reply.trim()) {
      throw new Error("The service returned an empty reply.");
    }

    thinkingMessage.textContent = reply;
    conversationHistory.push(
      { role: "user", content: message },
      { role: "assistant", content: reply },
    );
    chatWindow.scrollTop = chatWindow.scrollHeight;
  } catch (error) {
    thinkingMessage.remove();
    addMessage("ai error", `Sorry, I couldn't get a reply. ${error.message}`);
  } finally {
    userInput.disabled = false;
    sendBtn.disabled = false;
    userInput.focus();
  }
});

// Clear the custom empty-message warning as soon as the user starts typing.
userInput.addEventListener("input", () => {
  userInput.setCustomValidity("");
});
