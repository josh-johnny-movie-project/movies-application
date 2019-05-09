/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */

const appendMovieData = (title, rating) => {
  var html = "";
  html += `<div class='movieCard'>`;
  html += `<h4>${title}</h4>`;
  html += `<p>Rating: `  + `${rating}</p>`;
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
      $('#add-movies').append(appendMovieData(title, rating));
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


