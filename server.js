const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const session = require('express-session');

const app = express();

// MySQL Database connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Madhavi@123",
    database: "stores"
});

// Connecting to the database
connection.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
    }
    console.log("Connected to Database");
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'movie',
    resave: false,
    saveUninitialized: true
}));

// Hardcoded user for authentication
const validUser = {
    username: 'admin',
    password: 'password123'
};

// Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === validUser.username && password === validUser.password) {
        req.session.authenticated = true;
        res.redirect('/Movies.html'); 
    } else {
        res.status(401).json({ error: "Invalid username or password" });
    }
});

// Middleware to protect routes
function isAuthenticated(req, res, next) {
    if (req.session.authenticated) {
        next(); // User is authenticated, proceed to the next middleware
    } else {
        res.redirect('/login.html'); // Redirect to login if not authenticated
    }
}

// Serve the login page as the default route
app.get('/', (req, res) => {
    res.redirect('/login.html'); // Redirect to login.html on root
});

// Route to serve Movies.html after login
app.get('/Movies.html', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Movies.html'));
});

// Getting all the movie details from the database
app.get('/getMovieDetails', (req, res) => {
    connection.query('SELECT * FROM movies', (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database error" });
        }

        console.log("Movies details retrieved successfully");
        res.json(result);
    });
});

// Adding a new movie to the database
app.post('/postMovieDetails', (req, res) => {
    const { title, director, genre, releaseYear, duration, rating, posterUrl, boxOfficeCollection } = req.body;

    connection.query(
        'INSERT INTO movies (title, director, genre, release_year, duration_minutes, rating, poster_image, box_office_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [title, director, genre, releaseYear, duration, rating, posterUrl, boxOfficeCollection],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Database error" });
            }

            console.log("Movie added successfully");
            res.json({ success: true, message: "Movie added successfully" });
        }
    );
});

// Updating existing data in the database
app.put('/updateMovieDetails', (req, res) => {
    const { id, title, director, genre, releaseYear, duration, rating, posterUrl, boxOfficeCollection } = req.body;

    connection.query(
        'UPDATE movies SET title = ?, director = ?, genre = ?, release_year = ?, duration_minutes = ?, rating = ?, poster_image = ?, box_office_total = ? WHERE id = ?',
        [title, director, genre, releaseYear, duration, rating, posterUrl, boxOfficeCollection, id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Database error" });
            }

            console.log(`Updated successfully Movie id: ${id}`);
            res.json({ success: true, message: "Movie updated successfully" });
        }
    );
});

// Deleting existing data from the database
app.delete('/deleteMovieDetails', (req, res) => {
    const { id } = req.body;

    connection.query('DELETE FROM movies WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database error" });
        }

        console.log(`Deleted movie from database with id: ${id}`);
        res.json({ success: true, message: "Movie deleted successfully" });
    });
});

// Get movie details by ID
app.get('/getMovieDetailsById/:id', (req, res) => {
    const movieId = req.params.id;

    connection.query('SELECT * FROM movies WHERE id = ?', [movieId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database error" });
        }

        res.json(result[0]);
    });
});

// Server listening
app.listen(3000, err => {
    if (err) console.log(err);
    else {
        console.log("App is running on http://localhost:3000");
    }
});
