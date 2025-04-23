const chat = document.getElementById("chat");
const input = document.getElementById("userInput");

async function sendMessage() {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Show user message
  chat.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;
  input.value = "";

  try {
    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_message: userMessage })
    });

    const data = await response.json();
    const botReply = data.bot_message;

    // Show bot response
    chat.innerHTML += `<div><strong>Bot:</strong> ${botReply}</div>`;
    chat.scrollTop = chat.scrollHeight;
  } catch (error) {
    chat.innerHTML += `<div><strong>Bot:</strong> Error connecting to server.</div>`;
  }
}
