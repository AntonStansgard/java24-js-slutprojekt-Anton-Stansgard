

// Importerar in nödvändiga listor samt hantering av sökning och sortering 
import { fetchPopularMovies, fetchTopRatedMovies } from "./modules/api.js";


import { renderMovie, renderList } from "./modules/render.js";


import * as sort from "./modules/sort.js";


import { handleSearch } from "./modules/search.js";

// Referenser till HTML-element
const popularBtn = document.getElementById("popular-btn");
const topRatedBtn = document.getElementById("top-rated-btn");
const formEl = document.getElementById("search-form");
const inputEl = formEl.querySelector("input");
const moviesContainer = document.getElementById("movies");
const sortSelect = document.getElementById("sort-select");

// Variabler för aktuell lista, renderfunktion och sorteringstillstånd
let currentList = [];
let currentRenderFn = null;
let allowSorting = false;

// Hjälpfunktion för att uppdatera listan samt renderfunktion 
function updateAndRender(list, renderFn) {
  currentList = list;
  currentRenderFn = renderFn;
  renderList(moviesContainer, currentList, currentRenderFn);
}

// Eventlyssnare för när användaren klickar på "Populära filmer"
popularBtn.addEventListener("click", async () => {
  const data = await fetchPopularMovies();
  if (data?.results) {
    const top10 = data.results.slice(0, 10); // Begränsar till topp 10
    updateAndRender(top10, renderMovie);
    allowSorting = false; // Inaktivera sorteringen 
    sortSelect.disabled = true;
  } else {
    console.error(data?.error || "Ett okänt fel inträffade");
    moviesContainer.innerHTML = `<p class="error">${data?.error || "Ett fel inträffade när filmerna skulle hämtas."}</p>`;
  }
});

// Eventlyssnare när användaren klickar på "Topprankade filmer"
topRatedBtn.addEventListener("click", async () => {
  const data = await fetchTopRatedMovies();
  if (data?.results) {
    const top10 = data.results.slice(0, 10); // Begränsar till topp 10
    updateAndRender(top10, renderMovie);
    allowSorting = false;
    sortSelect.disabled = true;
  } else {
    console.error(data?.error || "Ett okänt fel inträffade");
    moviesContainer.innerHTML = `<p class="error">${data?.error || "Ett fel inträffade när filmerna skulle hämtas."}</p>`;
  }
});

// Eventlyssnare när användaren söker på film eller person
formEl.addEventListener("submit", async (e) => {
  e.preventDefault(); // Förhindra sidladdning
  const query = inputEl.value.trim(); // Hämtar användarens sökning 
  const typeEl = formEl.querySelector('input[name="type"]:checked'); // Jämför ifall det är en film eller person 

  if (!typeEl) {
    moviesContainer.innerHTML = `<p class="error">Välj om du vill söka på film eller person.</p>`;
    return;
  }

  const type = typeEl.value;
  if (query) {
    const { results, renderFn } = await handleSearch(query, type, moviesContainer);
    if (results && renderFn) {
      currentList = results;
      currentRenderFn = renderFn;
      allowSorting = true; // Aktiverar sortering
      sortSelect.disabled = false;
    }
  }
});

// Eventlyssnare när användaren ändrar sorteringsvalet
sortSelect.addEventListener("change", () => {
  if (!allowSorting || !currentList || !currentRenderFn) return;

  const selected = sortSelect.value;

  // Väljer rätt sorteringsfunktion utifrån valt alternativ
  const sortFn = {
    nameAsc: sort.sortByNameAsc,
    nameDesc: sort.sortByNameDesc,
    scoreAsc: sort.sortByScoreAsc,
    scoreDesc: sort.sortByScoreDesc
  }[selected];

  if (typeof sortFn === "function") {
    const sorted = sortFn([...currentList]); // Skapar kopia och sorterar
    renderList(moviesContainer, sorted, currentRenderFn);
  } else {
    console.warn("Ingen giltig sorteringsfunktion vald:", selected);
  }
});

// Visar populära filmer direkt som startsida
window.addEventListener("load", async () => {
  const data = await fetchPopularMovies();
  if (data?.results) {
    const top10 = data.results.slice(0, 10);
    updateAndRender(top10, renderMovie);
    allowSorting = false;
    sortSelect.disabled = true;
  } else {
    console.error(data?.error || "Ett okänt fel inträffade");
    moviesContainer.innerHTML = `<p class="error">${data?.error || "Ett fel inträffade när filmerna skulle hämtas."}</p>`;
  }
});
