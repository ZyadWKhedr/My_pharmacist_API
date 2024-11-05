const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database'); // Import the database module

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Medicine Routes
app.post('/medicines', (req, res) => {
    const { id, commercialName, medicalName, dosage, type, category, description, imageUrl, sideEffects, precautions, interactions } = req.body;

    const sql = `INSERT INTO medicines (id, commercialName, medicalName, dosage, type, category, description, imageUrl, sideEffects, precautions, interactions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(sql, [id, commercialName, medicalName, dosage, type, category, description, imageUrl, sideEffects, precautions, interactions], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, ...req.body });
    });
});

app.get('/medicines', (req, res) => {
    const sql = `SELECT * FROM medicines`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.get('/medicines/:id', (req, res) => {
    const sql = `SELECT * FROM medicines WHERE id = ?`;
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).send('Medicine not found');
        }
        res.json(row);
    });
});

app.put('/medicines/:id', (req, res) => {
    const { commercialName, medicalName, dosage, type, category, description, imageUrl, sideEffects, precautions, interactions } = req.body;

    const sql = `UPDATE medicines SET commercialName = ?, medicalName = ?, dosage = ?, type = ?, category = ?, description = ?, imageUrl = ?, sideEffects = ?, precautions = ?, interactions = ? WHERE id = ?`;
    db.run(sql, [commercialName, medicalName, dosage, type, category, description, imageUrl, sideEffects, precautions, interactions, req.params.id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).send('Medicine not found');
        }
        res.json({ message: 'Medicine updated successfully' });
    });
});

app.delete('/medicines/:id', (req, res) => {
    const sql = `DELETE FROM medicines WHERE id = ?`;
    db.run(sql, [req.params.id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).send('Medicine not found');
        }
        res.status(204).send();
    });
});

app.delete('/medicines', (req, res) => {
    const sql = `DELETE FROM medicines`;
    db.run(sql, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(204).send();
    });
});

// Article Routes
app.post('/articles', (req, res) => {
    const { title, articleLink, imageUrl } = req.body;

    const sql = `INSERT INTO articles (title, articleLink, imageUrl) VALUES (?, ?, ?)`;
    db.run(sql, [title, articleLink, imageUrl], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, ...req.body });
    });
});

app.get('/articles', (req, res) => {
    const sql = `SELECT * FROM articles`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.get('/articles/:id', (req, res) => {
    const sql = `SELECT * FROM articles WHERE id = ?`;
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).send('Article not found');
        }
        res.json(row);
    });
});

app.put('/articles/:id', (req, res) => {
    const { title, articleLink, imageUrl } = req.body;

    const sql = `UPDATE articles SET title = ?, articleLink = ?, imageUrl = ? WHERE id = ?`;
    db.run(sql, [title, articleLink, imageUrl, req.params.id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).send('Article not found');
        }
        res.json({ message: 'Article updated successfully' });
    });
});

app.delete('/articles/:id', (req, res) => {
    const sql = `DELETE FROM articles WHERE id = ?`;
    db.run(sql, [req.params.id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).send('Article not found');
        }
        res.status(204).send();
    });
});

app.delete('/articles', (req, res) => {
    const sql = `DELETE FROM articles`;
    db.run(sql, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(204).send();
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
