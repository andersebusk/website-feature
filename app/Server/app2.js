const express = require('express');
const cors = require('cors'); // Importer cors middleware
const apiRouter = require('./routes/imgRoute');

const app = express();
const port = process.env.PORT || 4000;

// Middleware til at tillade CORS-anmodninger fra alle kilder
app.use(cors());

// Middleware til at parse JSON-anmodninger
app.use(express.json());

// Brug API-routeren
app.use('/api', apiRouter);

// Start serveren
app.listen(port, () => {
    console.log(`Server kører på port ${port}`);
});