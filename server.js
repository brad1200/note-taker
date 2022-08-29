const express = require('express');
const path = require('path');
const notesDB = require('./db/db.json');
const fs = require('fs');

const PORT = process.env.port || 3001;

const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
})


app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf-8', (error) => {
        if (error) {
            throw error;
        }
        const { body } = req;
        notesDB.push(body);

        console.log(notesDB);

        fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(notesDB), (error) => {
            if (error) {
                throw error;
            }
            return res.json(notesDB);
        })
    })
});


app.delete('/api/notes/:id', (req, res) => {

});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
