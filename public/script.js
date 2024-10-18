document.addEventListener('DOMContentLoaded', () => {


    showdata();

    setTimeout(()=>{
document.querySelector(".loading").style.display="none";
    } 
    ,3000);
    
    


    // Function to create a card component for each movie
    function createCard(movie) {
        return `
        <div class="card" data-id="${movie.id}">
            <div class="image">
                <img src="${movie.poster_image}" alt="${movie.id}">
            </div>
            <div class="shadowEffect">
                ${movie.title}
                <div class="options" >
                <button class="edit-btn"></button>
                <button class="delete-btn"></button>
                </div>
            </div>
            <p>Director: ${movie.director}
            <br><br>Genre: ${movie.genre}
            <br><br>Year: ${movie.release_year}
            <br><br>Duration: ${movie.duration_minutes}
            <br><br>Rating: ${movie.rating}
            <br><br>Collections: $${movie.box_office_total}</p>
        </div>`;
    }
    

    // Function to fetch data and append each card to the movies div
    async function showdata() {
        try {
            const response = await fetch('/getMovieDetails');
            const result = await response.json();

            const movieContainer = document.querySelector('.movies'); // Main movies component

            result.forEach(movie => {
                const cardHTML = createCard(movie); // Generate card HTML for each movie
                movieContainer.innerHTML += cardHTML; // Append the card to the movies div
            });

            // Add delete button event listeners
            const deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const card = event.target.closest('.card');
                    const id = card.getAttribute('data-id'); // Get the ID from the card
                    confirmDelete(id);
                });
            });


            const editButtons = document.querySelectorAll('.edit-btn');
            editButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const card = event.target.closest('.card');
                    const id = card.getAttribute('data-id'); // Get the movie ID
        
                    // Fetch the movie data
                    fetchMovieData(id).then(movie => {
                        // Pre-fill the form with existing data
                        document.getElementById('editMovieId').value = movie.id;
                        document.getElementById('editTitle').value = movie.title;
                        document.getElementById('editDirector').value = movie.director;
                        document.getElementById('editGenre').value = movie.genre;
                        document.getElementById('editReleaseYear').value = movie.release_year;
                        document.getElementById('editDuration').value = movie.duration_minutes;
                        document.getElementById('editRating').value = movie.rating;
                        document.getElementById('editPosterUrl').value = movie.poster_image;
                        document.getElementById('editBoxOfficeCollection').value = movie.box_office_total;
        
                        // Show the edit modal
                        document.getElementById('editMovieModal').style.display = 'block';
                        document.getElementById('cancelEditMovie').addEventListener('click', () => {
                            document.getElementById('editMovieModal').style.display = 'none';
                        });

                        
    document.getElementById('editMovieForm').addEventListener('submit', async (event) => {
        event.preventDefault(); 
    
    
        let id = document.getElementById('editMovieId').value;
        let title = document.getElementById('editTitle').value;
        let director = document.getElementById('editDirector').value;
        let genre = document.getElementById('editGenre').value;
        let releaseYear = document.getElementById('editReleaseYear').value;
        let duration = document.getElementById('editDuration').value;
        let rating = document.getElementById('editRating').value;
        let posterUrl = document.getElementById('editPosterUrl').value;
        let boxOfficeCollection = document.getElementById('editBoxOfficeCollection').value;
    
        const updatedMovie = {
            id: id,
            title: title,
            director: director,
            genre: genre,
            releaseYear: releaseYear,
            duration: duration,
            rating: rating,
            posterUrl: posterUrl,
            boxOfficeCollection: boxOfficeCollection
        };
    
        try {
            const response = await fetch('/updateMovieDetails', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedMovie)
            });
    
            if (!response.ok) {
                throw new Error('Failed to update the movie');
            }
    
            const result = await response.json();
            console.log(result.message); // Log success message
            document.getElementById('editMovieModal').style.display = 'none'; // Hide the modal after success

    
          
            location.reload();
    
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    });
                    });
                });
            });

        } catch (error) {
            console.error('Error getting data:', error);
        }
    }

    //Helper function for edit 
    async function fetchMovieData(id) {
        const response = await fetch(`/getMovieDetailsById/${id}`);
        return await response.json();
    }

    // Function to show the delete confirmation modal
    function confirmDelete(movieId) {
        const deleteMovieModal = document.querySelector('.movieDelete');
        deleteMovieModal.style.display = "block";

        // Confirm Delete
        document.getElementById('confirmDelete').onclick = async () => {
            try {
                const response = await fetch('/deleteMovieDetails', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: movieId }), 
                });

                if (!response.ok) {
                    throw new Error('Failed to delete the movie');
                }

                deleteMovieModal.style.display = "none"; 
                const result = await response.json();
                console.log(result.message); // Log success message

                // Remove the card from the DOM
                const card = document.querySelector(`.card[data-id="${movieId}"]`);
                if (card) {
                    card.remove();
                }



            } catch (error) {
                console.error('Error deleting movie:', error);
            }
        };

        // Cancel Delete
        document.getElementById('cancelDelete').onclick = () => {
            deleteMovieModal.style.display = "none";
        };
    }


    
   
    

    // Show the Add Movie Modal
    document.querySelector('.addNewMovie').addEventListener('click', () => {
        document.getElementById('addMovieModal').style.display = 'block';
  

    // Hide the Add Movie Modal
    document.getElementById('cancelAddMovie').addEventListener('click', () => {
        document.getElementById('addMovieModal').style.display = 'none';
    });


    // Handle Form Submission
    document.getElementById('addMovieForm').addEventListener('click', async (event) => {
        event.preventDefault(); 

        let title = document.getElementById('title').value;
        let director = document.getElementById('director').value;
        let genre = document.getElementById('genre').value;
        let releaseYear = document.getElementById('releaseYear').value;
        let durationHours = document.getElementById('durationHours').value;
        let durationMinutes = document.getElementById('durationMinutes').value;
        let durationSeconds = document.getElementById('durationSeconds').value || "00"; 
        let duration = `${durationHours}:${durationMinutes}:${durationSeconds}`; 
        let rating = document.getElementById('rating').value;
        let posterUrl = document.getElementById('posterUrl').value;
        let boxOfficeCollection = document.getElementById('boxOfficeCollection').value;

        const newMovie = {
           title:title,
           director:director,
           genre:genre,
           releaseYear:releaseYear,
           duration,duration,
           rating:rating,
           posterUrl:posterUrl,
           boxOfficeCollection:boxOfficeCollection
        };

        console.log(newMovie)

        try {
            const response = await fetch('/postMovieDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMovie)
            });

            if (!response.ok) {
               
                throw new Error('Failed to add the movie');
                
            }

            const result = await response.json();
            console.log(result.message); // Log success message
            document.getElementById('addMovieModal').style.display = 'none'; // Hide the modal

            location.reload();

        } catch (error) {
            console.error('Error adding movie:', error);
        }
    });
});
  });