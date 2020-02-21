class Movie {
    constructor(title,director,rate,nick){
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

let id=0
// Submit button
document.querySelector('.movie').addEventListener("submit", function(e){
    
    const title = document.querySelector('.title').value,
          director = document.querySelector('.director').value,
          rate = document.querySelector('.rating').value,
          nick = document.querySelector('.nick').value;

    const table = new Table();

    //Validate
    if(title === '' || director === '' || rate === 'pick a rating' || nick === '')
    {
        table.info('Please fill all fields','error');
    }else{
        const movie = new Movie (title, director, rate,nick,id++);
        table.addMovie(movie);
        table.clear();
        table.info('Move has been added!','success');
    }

    e.preventDefault();
});

//Delete movie form list
document.querySelector('.tbody').addEventListener("click", function(e){
    const table = new Table();
    table.delete(e.target); 
    table.info('Movie has been deleted from the list!','success');
    e.preventDefault();
})