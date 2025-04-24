// Skapar ett filmkort som visas på webbplatsen
export function renderMovie(movie) {
    const el = document.createElement("div");
    el.classList.add("movie");
  
    // Om filmen har en poster används den, annars visas en platshållarbild
    const posterPath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/500x750?text=Ingen+bild";
  
    // Fyller kortet med filminformation
    el.innerHTML = `
      <img src="${posterPath}" alt="${movie.title}">
      <h2>${movie.title}</h2>
      <p>Releasedatum: ${movie.release_date || "Okänt"}</p>
      <p>Betyg: ${movie.vote_average}</p>
      <p>${movie.overview || "Ingen beskrivning tillgänglig."}</p>
    `;
  
    return el; // Returnerar det färdiga kortet
  }
  
  // Skapar ett personkort som visas på webbplatsen
  export function renderPerson(person) {
    const el = document.createElement("div");
    el.classList.add("movie");
  
    // Om personen har en profilbild används den, annars visas en platshållarbild
    const profilePath = person.profile_path
      ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
      : "https://via.placeholder.com/500x750?text=Ingen+bild";
  
    // Skapar en lista över vad personen är känd för
    const knownList = person.known_for.map(kf => {
      const type = kf.media_type === "movie" ? "Film" : "TV";
      return `<li>${type}: ${kf.title || kf.name}</li>`;
    }).join("");
  
    // Fyller kortet med information om personen
    el.innerHTML = `
      <img src="${profilePath}" alt="${person.name}">
      <h2>${person.name}</h2>
      <p>Avdelning: ${person.known_for_department}</p>
      <p>Popularitet: ${person.popularity}</p>
      <ul>${knownList}</ul>
    `;
  
    return el; // Returnerar det färdiga kortet
  }
  
  // Renderar en lista av kort filmer eller personer i angiven container
  export function renderList(container, items, renderFn) {
    container.innerHTML = ""; // Tömmer tidigare innehåll
    items.forEach(item => {
      container.appendChild(renderFn(item)); // Lägger till varje kort
    });
  }
  