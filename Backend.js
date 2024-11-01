const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.post("/generate-lab", async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );
        const output = response.data.choices[0].message.content;
        res.json({ output });
    } catch (error) {
        res.status(500).send("Error generating lab data");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
