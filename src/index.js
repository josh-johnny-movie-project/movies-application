/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */

const appendMovieData = (title, rating, id) => {
  var html = "";
  html += `<div id=${id} class='movieCard'>`;
  html += `<h4>${title}</h4>`;
  html += `<p>Rating: `  + `${rating}</p>`;
  html += `<button type="button" class="editForm">Edit</button>`;
  html += `</div>`;
  return html
};

const $ = require("jquery");

const {getMovies} = require('./api.js');

$(function() {
  upDateMovies();
});

const upDateMovies = () => {
  getMovies().then((movies) => {
    $('#add-movies').html('');
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
      console.log(`id#${id} - ${title} - rating: ${rating}`);
      $('#add-movies').append(appendMovieData(title, rating, id));
    });
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });
};


$("#submit").click(function () {
  console.log('TEST');
const newMovie =
    { title: $("#userTitle").val(),
      rating: $("#userRating").val()
    };
const url = '/api/movies';
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newMovie),
};
  fetch(url, options)
      .then(upDateMovies)
      .catch();
});


$.ajax("http://www.omdbapi.com/?t=jaws&apikey=f2e07699").done(function (data) {
console.log(data);
});

getMovies().then((movies) => {
  movies.forEach(({title, rating, id}) => {
    console.log(id);
  });
});

$("body").on('click', '.editForm', function () {
  getMovies().then((movies) => {
    const url = '/api/movies/' + movies[$(this.id) - 1 + ''].id;
    const options = {
      method: 'DELETE',
    };
    fetch(url, options)
        .then(upDateMovies)
        .catch();
  });
});
