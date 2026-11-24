const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.SERVER_PORT || process.env.PORT || 3000;

app.get('/api/otp', async (req, res) => {
    let { nomor } = req.query;

    if (!nomor) {
        return res.status(400).json({ status: false, message: 'Parameter nomor wajib diisi' });
    }

    let cleanNomor = String(nomor).replace(/\D/g, '');

    if (cleanNomor.startsWith('0')) {
        cleanNomor = '62' + cleanNomor.slice(1);
    } else if (cleanNomor.startsWith('8')) {
        cleanNomor = '62' + cleanNomor;
    }

    if (cleanNomor.length < 10 || cleanNomor.length > 15) {
        return res.status(400).json({ status: false, message: 'Format nomor tidak valid' });
    }

    try {
        const apiUrl = `https://github.com/khususbanding749-ai/api/otp?nomor=${cleanNomor}`;
        
        const response = await axios.get(apiUrl, { timeout: 15000 });

        res.json(response.data);

    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        }
        res.status(500).json({ status: false, message: 'Gagal terhubung ke API OTP: ' + error.message });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 API OTP GrenXharimau jalan di port ${PORT}`);
});
