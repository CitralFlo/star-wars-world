<template>
  <div class="films-list">
    <div v-if="films.length">
      <MovieCard
          v-for="film in films"
          :key="film.title"
          :film="film"
          :characters="charactersForFilm(film)"
          :selectedCharacterUrl.sync="selectedCharacterUrls[film.title]"
          @update:selectedCharacterUrl="updateCharacterUrl(film.title, $event)"
      />
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getFilms, getCharacter, Film, Character } from './MoviesFetch';
import MovieCard from './MovieCard.vue';
import CharacterDetails from './CharacterDetails.vue';

export default defineComponent({
  name: 'FilmsList',
  components: {
    MovieCard,
    CharacterDetails
  },
  setup() {
    const films = ref<Film[]>([]);
    const characters = ref<Character[]>([]);
    const selectedCharacterUrls = ref<Record<string, string | null>>({});

    const fetchFilms = async () => {
      try {
        const fetchedFilms = await getFilms();
        films.value = fetchedFilms;
        await fetchAllCharacters(fetchedFilms);
        initializeSelectedCharacterUrls(fetchedFilms);
      } catch (error) {
        console.error('Error fetching films:', error);
      }
    };

    const fetchAllCharacters = async (films: Film[]) => {
      const characterUrls = Array.from(new Set(films.flatMap(film => film.characters)));
      const characterPromises = characterUrls.map(url => getCharacter(url));
      characters.value = await Promise.all(characterPromises);
    };

    const initializeSelectedCharacterUrls = (films: Film[]) => {
      selectedCharacterUrls.value = films.reduce((acc, film) => {
        if (film.characters.length > 0) {
          acc[film.title] = film.characters[0]; // Default to the first character
        }
        return acc;
      }, {} as Record<string, string | null>);
    };

    const charactersForFilm = (film: Film) => {
      return characters.value.filter(character => film.characters.includes(character.url));
    };

    const updateCharacterUrl = (filmTitle: string, url: string | null) => {
      selectedCharacterUrls.value[filmTitle] = url;
    };

    onMounted(fetchFilms);

    return {
      films,
      charactersForFilm,
      selectedCharacterUrls,
      updateCharacterUrl
    };
  }
});
</script>

<style>
.films-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Adjust based on your needs */
  gap: 1rem; /* Space between cards */
  padding: 1rem;
}

.films-list > * {
  margin: 0;
}

.movie-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-areas:
    "title title"
    "opening-crawl opening-crawl"
    "details details"
    "character-selector character-selector";
  grid-gap: 1em;
  max-width: 100%;
}

.title {
  grid-area: title;
  font-size: 1.5em;
  margin: 0;
  color: #333;
}

.opening-crawl {
  grid-area: opening-crawl;
  font-style: italic;
  color: #555;
}

.details {
  grid-area: details;
  list-style: none;
  padding: 0;
  margin: 0;
}

.details li {
  margin-bottom: 0.5em;
}

.details strong {
  color: #333;
}

.character-selector {
  grid-area: character-selector;
}

select {
  width: 100%;
  padding: 0.5em;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1em;
}

select:focus {
  border-color: #007bff;
  outline: none;
}

label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bold;
  color: #333;
}

.character-details {
  margin-top: 1em;
}
</style>
