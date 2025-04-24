
import { searchMovies, searchPeople } from "./api.js";


import { renderMovie, renderPerson, renderList } from "./render.js";

// Huvudfunktion för att hantera sökning
export async function handleSearch(query, type, container) {
  try {
    // Beroende på typ (film eller person), anropas rätt sökfunktion
    const response = type === "movie"
      ? await searchMovies(query)
      : await searchPeople(query);

    // Om ett felmeddelande returnerats
    if (response.error) {
      container.innerHTML = `<p class="error">${response.error}</p>`;
      return { results: [], renderFn: null }; // Returnera tomma resultat
    }

    // Om inga resultat hittades
    if (!response.results || response.results.length === 0) {
      container.innerHTML = `<p>Inget resultat för "${query}".</p>`;
      return { results: [], renderFn: null };
    }

    // Bestämmer vilken funktion som ska användas film eller person
    const renderFn = type === "movie" ? renderMovie : renderPerson;

    
    renderList(container, response.results, renderFn);

    
    return { results: response.results, renderFn };

  } catch (err) {
    // Visar ett generellt felmeddelande om något går fel under sökningen
    container.innerHTML = `<p class="error">Ett oväntat fel uppstod. Försök igen senare.</p>`;
    console.error("Sökfel:", err); // Loggar tekniskt fel till konsolen
    return { results: [], renderFn: null };
  }
}
