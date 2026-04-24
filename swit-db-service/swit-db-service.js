const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// รับข้อมูลจาก Gateway มาบันทึกลง Supabase
app.post('/internal/save', async (req, res) => {
    const { name, score } = req.body;
    const { data, error } = await supabase.from('scores').insert([{ name, score }]).select();
    
    if (error) return res.status(400).json(error);
    res.status(201).json(data[0]);
});

app.get('/internal/scores', async (req, res) => {
    const { data, error } = await supabase.from('scores').select('*').order('id', { ascending: true });
    if (error) return res.status(400).json(error);
    res.json(data);
});

app.listen(3001, () => console.log('📦 DB Service running on port 3001'));