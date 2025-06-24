const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const list = document.getElementById('movie-list');

async function searchMovies() {
  const query = searchInput.value.trim();
  if (query.length < 3) return;

  const res = await fetch(`https://www.omdbapi.com/?apikey=7e10ff16&s=${query}`);
  const data = await res.json();

  list.innerHTML = '';
  if (data.Search) {
    data.Search.forEach(movie => {
      const div = document.createElement('div');
      div.className = 'movie';
      div.innerHTML = `
        <img src="${movie.Poster !== "N/A" ? movie.Poster : ''}" alt="${movie.Title}" />
        <h4>${movie.Title}</h4>
        <p>${movie.Year}</p>
      `;
      list.appendChild(div);
    });
  } else {
    list.innerHTML = '<p>No results found</p>';
  }
}

searchBtn.addEventListener('click', searchMovies);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchMovies();
  }
});
