# movie_lister

A web application that searchs for movies that was released in 2020 and displays movie details (duration, imdb, cast etc.) using OMDb API.

## Features
```
Searchbar: 
    *Autocomplete option to find best matches for searched string/title.
    *Text highlight on autocomplete results matching the searched string/title.

Movies List:
    *Display best results of the searched string/title with movie posters 5 at a time.
    *Has buttons to navigate through search results. (First 5 movies, second 5 movies ...)
    *Displays detailed movie properties when clicked on the related movie poster.

App:
    *Displays spinner when loading movies from database.
    *Displays `no image avilable` for movie poster for required movies.
    !!! Movies that are displayed with no `image available` poster are movies without any poster available from OMDb API.
```

## Project
```
    Project is deployed on https://movie-finder.onrender.com/.
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
