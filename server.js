const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.use(express.json());

app.post('/generate-image', async (req, res) => {
  try {
    const text = req.body.text;
    require('dotenv').config();
    const apiToken = process.env.REPLICATE_API_TOKEN;
    const response = await fetch('https://api.replicate.com/v1/models/black-forest-labs/flux-1.1-pro-ultra/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait',
      },
      body: JSON.stringify({
        input: {
          prompt: text,
          aspect_ratio: '3:2',
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const imageData = await response.json();
    const imageUrl = imageData.output;
    res.json({ output: imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
