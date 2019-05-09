/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */

const appendMovieData = (title, rating, id) => {
  let html = "";
  html += `<div id=${id} class='movieCard'>`;
  html += `<h4>${title}</h4>`;
  html += `<p>Rating: `  + `${rating}</p>`;
  html += `<button type="button" class="deleteMovie">Delete!</button>`;
  html += `<button type="button" class="slide">Edit</button>`;
  html +=  `<div id="userEdit">`;
  html +=  `<label for="editTitle">Edit Title :</label>`;
  html +=  `<input id="editTitle" type="text">`;
  html +=  `<label for="editRating">Edit Rating :</label>`;
  html +=  `<select name="editRating" id="editRating">`;
  html +=  `<option value="1">1</option>`;
  html +=  `<option value="2">2</option>`;
  html +=  `<option value="3">3</option>`;
  html +=  `<option value="4">4</option>`;
  html +=  `<option value="5">5</option>`;
  html +=  `</select>`;
  html += `<button type="button" class="editForm">Post</button>`;
  html +=  `</div>`;
  html += `</div>`;
  return html
};

const $ = require("jquery");

const {getMovies} = require('./api.js');

$(function() {
  upDateMovies();
});

$(document).on('click', '.slide', function () {
  $(this).next().slideToggle(1000);
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



$(document).on('click', '.deleteMovie', function () {
    const url = '/api/movies/' + [$(this).parent("div").attr("id")];
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(url, options)
        .then(upDateMovies)
});


//------------------------------------------------------------------------------------------------------//

const upDateInfo = (movies) => {
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

$(document).on('click', '.editForm', function () {
  const userEdit =
      { title: $("#editTitle").val(),
        rating: $("#editRating").val()
      };
  getMovies().then((movies) => {
    const url = '/api/movies/' + [$(this).parent("div").attr("id")];
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userEdit),
    };
    fetch(url, options)
        .then(upDateInfo)
  });
});


