const PRIMARY_MODEL = 'openai/gpt-oss-20b';
const FALLBACK_MODEL = 'llama-3.3-70b-versatile';

async function callGroq(apiKey, model, messages) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model,
            messages,
            temperature: 0.7,
            max_tokens: 300
        })
    });
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages } = req.body || {};
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Server configuration error: Missing API Key' });
    }
    if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages must be a non-empty array' });
    }

    try {
        let result = await callGroq(apiKey, PRIMARY_MODEL, messages);

        if (!result.ok && result.status >= 400 && result.status < 500) {
            result = await callGroq(apiKey, FALLBACK_MODEL, messages);
        }

        if (!result.ok) {
            console.error('Groq API Error:', result.data);
            return res.status(result.status).json({
                error: result.data?.error?.message || 'Failed to fetch from Groq'
            });
        }

        return res.status(200).json(result.data);
    } catch (error) {
        console.error('Groq API Error:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
