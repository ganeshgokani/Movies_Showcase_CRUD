# Movie Management Application

This is a Node.js and Express.js-based web application for managing movies, integrated with a MySQL database. The application allows users to **add**, **edit**, **delete**, and **view** movies. It also provides a simple and user-friendly interface for handling movie details like title, director, genre, release year, duration, rating, poster image URL, and box office collections.

## Features

- **Add Movie**: Users can add new movies with all relevant details like title, director, genre, release year, duration, rating, and poster URL.
- **Edit Movie**: Users can update existing movie details.
- **Delete Movie**: Users can delete movies with a confirmation prompt.
- **View Movie List**: Dynamically display movie cards for each entry in the database.
  
## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Frontend**: HTML, CSS, JavaScript
- **AJAX**: Fetch API for handling asynchronous requests
- **UI Components**: Custom modal forms for adding and editing movies


Login Credentials :
username: admin
password:password123

API Endpoints
1. Get All Movies
Endpoint: /getMovieDetails

Method: GET

Description: Fetches all movies from the database.

2. Get Movie By ID
Endpoint: /getMovieDetailsById/:id

Method: GET

Description: Fetches a specific movie by its ID.

3. Add a New Movie
Endpoint: /postMovieDetails

Method: POST

Description: Adds a new movie to the database.

4. Update Movie
Endpoint: /updateMovieDetails

Method: PUT

Description: Updates an existing movie's details.

5. Delete Movie
Endpoint: /deleteMovieDetails

Method: DELETE

Description: Deletes a movie from the database.
