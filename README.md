#  Antons Filmtips

Mitt program är ett JavaScript-baserat projekt som använder [The Movie Database (TMDB)](https://www.themoviedb.org/) API för att visa populära och topprankade filmer samt tillåta sökningar på både filmer och personer.

##  Funktioner

- Visa populära filmer
- Visa topprankade filmer
- Sök efter filmer eller personer
- Sortera sökresultat efter namn (A–Ö, Ö–A) eller betyg (lägst till högst, högst till lägst)

##  Struktur samt användingsområden 

Projektet är uppdelat i moduler enligt ES Modules-strukturen. All logik är separerad i olika JavaScript-filer för tydlighet och återanvändbarhet:

- `main.js`: Startpunkt och koppling mellan gränssnitt och logik
- `modules/api.js`: Hämtar data från TMDB API
- `modules/render.js`: Skapar och visar film- och personkort
- `modules/search.js`: Hanterar söklogik
- `modules/sort.js`: Hanterar sortering
- `style.css`: Design och layout
- `index.html`: Gränssnitt och HTML-struktur

##  Teknologier

- HTML
- CSS
- JavaScript 
- Fetch API
- TMDB API



