# Project 8: L'Oréal Chatbot

L’Oréal is exploring the power of AI, and your job is to showcase what's possible. Your task is to build a chatbot that helps users discover and understand L’Oréal’s extensive range of products—makeup, skincare, haircare, and fragrances—as well as provide personalized routines and recommendations.

## 🚀 Launch via GitHub Codespaces

1. In the GitHub repo, click the **Code** button and select **Open with Codespaces → New codespace**.
2. Once your codespace is ready, open the `index.html` file via the live preview.

## ☁️ Cloudflare Note

The chat sends a `messages` array to your class Cloudflare Worker and displays the assistant reply from `data.choices[0].message.content`. Before testing, replace the example Worker URL near the top of `script.js` with the URL provided by your class.

Keep the OpenAI API key in the Cloudflare Worker secret. Never add it to `script.js` or another file served to the browser.

Enjoy building your L’Oréal beauty assistant! 💄
