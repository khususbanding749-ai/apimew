const express = require('express');
const { initChat } = require('duckduckgo-ai-chat-cjs');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001; // Gunakan port berbeda dari API OTP

app.get('/api/ai', async (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ status: false, message: 'Parameter q wajib diisi' });
    }

    try {
        // Inisialisasi chat (bisa ganti model: gpt-4o-mini, claude-3-haiku, dll)
        const chat = await initChat("gpt-4o-mini");
        
        // Ambil jawaban penuh
        const message = await chat.fetchFull(q);

        res.json({
            status: true,
            creator: "GrenXharimau",
            model: "gpt-4o-mini",
            query: q,
            reply: message
        });

    } catch (error) {
        res.status(500).json({ status: false, message: 'Gagal mendapatkan respons AI: ' + error.message });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 AI Chat API GrenXharimau aktif di port ${PORT}`);
});
