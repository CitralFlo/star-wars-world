<template>
  <div class="films-list">
      <MovieCard
          v-if="films.length"
          v-for="film in films"
          :key="film.title"
          :film="film"
          :characters="charactersForFilm(film)"
          :selectedCharacterUrl.sync="selectedCharacterUrls[film.title]"
          @update:selectedCharacterUrl="updateCharacterUrl(film.title, $event)"
      />
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
    MovieCard
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
  grid-template-columns: repeat(2, 1fr); /* Two columns */
  gap: 1rem; /* Space between cards */
  padding: 1rem;
}

.film-list > * {
  margin: 0;
}
</style>
