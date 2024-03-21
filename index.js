const express = require('express');
const app = express();
const port = process.env.PORT || 8030;

app.get('/upasana/room/101', (req, res) => {
    res.json({ light: 1, light_state: 1, fan: 1, fan_state: 1 });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
