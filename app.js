class Movie {
    constructor(title,director,rate,nick,id){
        this.title=title;
        this.director=director;
        this.rate=rate;
        this.nick=nick;
        this.id=id;
    }
}

class Table {
    addMovie(movie){
        const tbody = document.querySelector('.tbody');

        const movieList = document.createElement('tr');

        movieList.innerHTML=`
            <td>${movie.id}</td>
            <td>${movie.title}</td>
            <td>${movie.director}</td>
            <td>${movie.rate}</td>
            <td>${movie.nick}</td>
            <td><a href="" class="delete">X</a></td>
        `;

        tbody.appendChild(movieList);
    }

    clear(){
        document.querySelector('.title').value='';
        document.querySelector('.director').value='';
        document.querySelector('.rating').value='pick a rating';
        document.querySelector('.nick').value='';
    }

    info(message,className){
        const div = document.createElement('div');
        div.className = `${className} mb-2 p-2`;
        div.appendChild(document.createTextNode(message));
        const content = document.querySelector('.content');
        const movie = document.querySelector('.movie');
        content.insertBefore(div,movie);

        setTimeout(function(){
            div.remove();
        }, 3000)
    }

    delete(target){
        if(target.className === 'delete')
        {
            target.parentElement.parentElement.remove();
        }
    }
}

//Local storage
class Store{
    static getMovies(){
        let movies;
        if(localStorage.getItem('movies')===null){
            movies =[];
        }else{
            movies = JSON.parse(localStorage.getItem('movies'));
        }

        return movies;
    }

    static showMovie(){
        const movies =Store.getMovies();

        movies.forEach(function(movie){
            const table = new Table;

            table.addMovie(movie);
        });
    }

    static addMovieStorage(movie){
        const movies = Store.getMovies();

        movies.push(movie);

        localStorage.setItem('movies', JSON.stringify(movies));
    }

    static removeMovie(id){
        const movies = Store.getMovies();

        movies.forEach(function(movie, index){
            if(movie.id == id){
                movies.splice(index,1);
            }
        });

        localStorage.setItem('movies', JSON.stringify(movies));
    }
}

//display movies from local storage on DOM load
document.addEventListener('DOMContentLoaded', Store.showMovie);
// Submit button
document.querySelector('.movie').addEventListener("submit", function(e){
    
    const title = document.querySelector('.title').value,
          director = document.querySelector('.director').value,
          rate = document.querySelector('.rating').value,
          nick = document.querySelector('.nick').value;

    const table = new Table();

    //setting id
    let id;
    //if local storage is empty then id = 0
    if(localStorage.getItem('movies')===null){
        id=0;
    // if not then parse to table of objects, then get the last object which is the last added movie and get its values,
    // from the table of values get the last element which is the last added id, then assign a new id
    }else{
        let moviesStorage =JSON.parse(localStorage.getItem('movies'));
        let lastMovie = Object.values(moviesStorage[moviesStorage.length-1]);
        let properId = lastMovie[lastMovie.length-1];
        id=properId;
    }

    //Validate
    if(title === '' || director === '' || rate === 'pick a rating' || nick === '')
    {
        table.info('Please fill all fields','error');
    }else{
        const movie = new Movie (title, director, rate,nick,++id);
        table.addMovie(movie);
        Store.addMovieStorage(movie);
        table.clear();
        table.info('Move has been added!','success');
    }

    e.preventDefault();
});

//Delete movie form list
document.querySelector('.tbody').addEventListener("click", function(e){
    const table = new Table();
    table.delete(e.target); 
    //Delete movie after taking its id
    Store.removeMovie(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
    table.info('Movie has been deleted from the list!','success');
    e.preventDefault();
})