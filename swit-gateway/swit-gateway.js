const express = require('express');
const axios = require('axios'); // ติดตั้งเพิ่ม: npm install axios
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// URL ของ Database Service (ถ้าออนไลน์แล้วให้ใช้ URL จาก Cloud)
const DB_SERVICE_URL = process.env.DB_SERVICE_URL || 'http://localhost:3001';

// รับข้อมูลจาก Client แล้วส่งต่อไปที่ DB Service
app.post('/api/save', async (req, res) => {
    try {
        const response = await axios.post(`${DB_SERVICE_URL}/internal/save`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Gateway Error: ไม่สามารถติดต่อ DB Service ได้' });
    }
});

// ดึงข้อมูลผ่าน Gateway
app.get('/api/scores', async (req, res) => {
    try {
        const response = await axios.get(`${DB_SERVICE_URL}/internal/scores`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Gateway Error' });
    }
});

app.listen(3000, () => console.log('🚀 SWIT Gateway running on port 3000'));