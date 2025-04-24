// Sorterar genom listan av aktuella filmer/personer och jämför med varje parameter i listan så sorteringen är korrekt. 
export function sortByNameAsc(list) {
    return [...list].sort((a, b) => (a.title || a.name).localeCompare(b.title || b.name));
  }
  
  export function sortByNameDesc(list) {
    return [...list].sort((a, b) => (b.title || b.name).localeCompare(a.title || a.name));
  }
  
  export function sortByScoreAsc(list) {
    return [...list].sort((a, b) => (a.vote_average || a.popularity) - (b.vote_average || b.popularity));
  }
  
  export function sortByScoreDesc(list) {
    return [...list].sort((a, b) => (b.vote_average || b.popularity) - (a.vote_average || a.popularity));
  }
  