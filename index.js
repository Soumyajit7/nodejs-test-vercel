const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const app = express();
const port = process.env.PORT || 8030;

app.use(bodyParser.json()); // for parsing application/json

let roomState = { light: 1, light_state: 1, fan: 1, fan_state: 1 };

app.get('/upasana/room/101', (req, res) => {
    res.json(roomState);
});

app.post('/schedule', (req, res) => {
    const { time } = req.body; // get the time from the request body

    // validate the time format (should be in 24-hour format, e.g., "22:00")
    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
        return res.status(400).json({ error: 'Invalid time format. Time should be in 24-hour format (e.g., "22:00").' });
    }

    // schedule a task to run at the specified time every day
    cron.schedule(`0 ${time.split(':')[1]} ${time.split(':')[0]} * * *`, () => {
        console.log('Turning off the light...');
        roomState.light = roomState.light_state ? 0 : 1;
    });

    res.json({ message: `Scheduled a task to turn off the light at ${time} every day.` });
});

app.get('/demo', (req, res) => {
    roomState.light_state = roomState.light_state ? 0 : 1;
    res.json(roomState);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
