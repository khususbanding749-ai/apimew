const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.get('/api/ai', async (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ status: false, message: 'Parameter q wajib diisi' });
    }

    try {
        // Menggunakan API publik Pollinations AI (Gratis & Tanpa Key)
        const apiUrl = `https://text.pollinations.ai/${encodeURIComponent(q)}`;
        
        const response = await axios.get(apiUrl, { timeout: 30000 });

        res.json({
            status: true,
            creator: "GrenXharimau",
            model: "openai",
            query: q,
            reply: response.data // Langsung teks jawabannya
        });

    } catch (error) {
        res.status(500).json({ status: false, message: 'Gagal mendapatkan respons AI: ' + error.message });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 AI Chat API GrenXharimau aktif di port ${PORT}`);
});
