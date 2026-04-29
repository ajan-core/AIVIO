// AIVIO Premium Engine Update
const part1 = "gsk_1wQgv71NJ";
const part2 = "3va5z9WqtwTWGdyb3FYPw5dLXrlPDfpJhGk80MPB8Td";
const FINAL_KEY = part1 + part2;

async function generate() {
    const char = document.getElementById('char-name').value;
    const prompt = document.getElementById('prompt-input').value;
    const status = document.getElementById('status-text');
    const btn = document.getElementById('gen-btn');

    if(!char || !prompt) return alert("Pehle naam aur scene likhein!");

    btn.disabled = true;
    btn.innerText = "PROCESSING...";
    status.innerText = "AIVIO Engine is connecting...";

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${FINAL_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.1-70b-versatile",
                messages: [{ role: "user", content: `Detailed Cinematic Video Script for: ${char}, Action: ${prompt}` }]
            })
        });

        const data = await response.json();
        if(data.choices) {
            status.innerHTML = `<div style='color:#007AFF; text-align:left;'>${data.choices[0].message.content}</div>`;
            btn.innerText = "GENERATE AGAIN";
        } else {
            status.innerText = "API Limit Over. Try later.";
        }
    } catch (e) {
        status.innerText = "Connection Error. Check Internet.";
    } finally {
        btn.disabled = false;
    }
}
