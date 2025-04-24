// Min personliga API-nyckel från TMDB
const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGQ5ZDViZDY1ZjAzOGRjY2RhNWJiNzgzOTFhYzRkYiIsIm5iZiI6MTc0NTEzNjI0Mi45MTIsInN1YiI6IjY4MDRhYTcyZTNmYWMyZjkwMjg5Y2NkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oPagGtqZ4UZeac_cnaQjJ4XfMweAVZpUkQ1CIAKxk4E."; 

const HEADERS = {
  accept: "application/json",      
  Authorization: API_KEY           
};

// Hämtar populära filmer från TMDB
export const fetchPopularMovies = async () => {
  try {
    const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
      headers: HEADERS
    });

    if (!res.ok) throw new Error("Serverfel"); // Kontrollera att svaret är OK

    const data = await res.json(); // Konvertera svaret till JSON

    // Om inga resultat hittas returneras ett felmeddelande
    if (!data.results || data.results.length === 0) {
      return { error: "Inga populära filmer kunde hämtas." };
    }

    return { results: data.results }; // Returnera resultaten
  } catch (err) {
    // Om något går fel i anropet
    return { error: "Kunde inte hämta populära filmer. Försök igen senare." };
  }
};

// Hämtar topprankade filmer från TMDB
export const fetchTopRatedMovies = async () => {
  try {
    const res = await fetch("https://api.themoviedb.org/3/movie/top_rated", {
      headers: HEADERS
    });

    if (!res.ok) throw new Error("Serverfel");

    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      return { error: "Inga topprankade filmer kunde hämtas." };
    }

    return { results: data.results };
  } catch (err) {
    return { error: "Kunde inte hämta topprankade filmer. Försök igen senare." };
  }
};

// Söker efter filmer baserat på användarens sökning
export const searchMovies = async (query) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=1`,
      { headers: HEADERS }
    );

    if (!res.ok) throw new Error("Serverfel");

    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      return { error: `Inga filmer hittades för "${query}".` };
    }

    return { results: data.results };
  } catch (err) {
    return { error: "Kunde inte söka efter filmer. Försök igen senare." };
  }
};

// Söker efter personer 
export const searchPeople = async (query) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(query)}&page=1`,
      { headers: HEADERS }
    );

    if (!res.ok) throw new Error("Serverfel");

    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      return { error: `Inga personer hittades för "${query}".` };
    }

    return { results: data.results };
  } catch (err) {
    return { error: "Kunde inte söka efter personer. Försök igen senare." };
  }
};
