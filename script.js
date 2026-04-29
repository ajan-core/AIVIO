// Aapki Groq API Key
const GROQ_KEY = "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";

function enterApp() {
    document.getElementById('splash').style.display = 'none';
    document.getElementById('app').style.display = 'flex';
}

async function generate() {
    const char = document.getElementById('char-name').value;
    const prompt = document.getElementById('prompt-input').value;
    const status = document.getElementById('status-text');
    const resultDiv = document.getElementById('result-display');
    const btn = document.getElementById('gen-btn');

    if(!char || !prompt) {
        alert("Please fill in the character and action!");
        return;
    }

    // Loading State
    btn.disabled = true;
    btn.innerText = "🎬 AI IS ANALYZING SCENE...";
    status.innerText = "Connecting to High-Fi AI Engine...";

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.1-70b-versatile",
                messages: [
                    { 
                        role: "system", 
                        content: "You are a professional Anime & Cinematic Director. Describe a 4K scene with lighting, camera angles, and character dialogue." 
                    },
                    { 
                        role: "user", 
                        content: `Character: ${char}. Action: ${prompt}` 
                    }
                ]
            })
        });

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;

        // Show Results
        status.innerHTML = `<h3 style="color:#007AFF">Scene Generation Complete!</h3>`;
        resultDiv.innerHTML = `<div style="text-align:left; font-size:14px; color:#ccc; margin-top:20px; line-height:1.6;">${aiResponse}</div>`;
        
        document.getElementById('dl-btn').style.display = "inline-block";
        btn.disabled = false;
        btn.innerText = "GENERATE NEXT SCENE";

    } catch (error) {
        status.innerText = "Error: Check API Key or Internet.";
        btn.disabled = false;
        btn.innerText = "RETRY GENERATION";
    }
}

