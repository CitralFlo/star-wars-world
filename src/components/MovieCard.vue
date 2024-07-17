<template>
  <div class="movie-card">
    <div class="movie-info">
      <h1 class="title">{{ film.title }}</h1>
      <p class="opening-crawl">{{ film.opening_crawl }}</p>
      <ul class="details">
        <li><strong>Director:</strong> {{ film.director }}</li>
        <li><strong>Producer:</strong> {{ film.producer }}</li>
        <li><strong>Release Date:</strong> {{ film.release_date }}</li>
      </ul>
    </div>
    <div class="character-selector">
      <label for="characters">Select a character:</label>
      <select
          id="characters"
          :value="selectedCharacterUrl"
          @change="handleCharacterChange($event.target.value)"
      >
        <option value="">-- Select a character --</option>
        <option v-for="character in characters" :key="character.url" :value="character.url">
          {{ character.name }}
        </option>
      </select>
      <CharacterDetails
          v-if="selectedCharacterUrl"
          :characterUrl="selectedCharacterUrl"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, watch} from 'vue';
import { Film, Character } from './MoviesFetch';
import CharacterDetails from './CharacterDetails.vue';

export default defineComponent({
  name: 'MovieCard',
  components: {
    CharacterDetails
  },
  props: {
    film: {
      type: Object as PropType<Film>,
      required: true
    },
    characters: {
      type: Array as PropType<Character[]>,
      required: true
    },
    selectedCharacterUrl: {
      type: String as PropType<string | null>,
      default: null
    }
  },
  emits: ['update:selectedCharacterUrl'],
  setup(props, { emit }) {
    watch(
        () => props.film,
        (newFilm) => {
          if (newFilm && newFilm.characters.length > 0) {
            emit('update:selectedCharacterUrl', newFilm.characters[0]);
          }
        },
        { immediate: true }
    );

    const handleCharacterChange = (url: string) => {
      emit('update:selectedCharacterUrl', url || null);
    };

    return {
      handleCharacterChange
    };
  }
});

</script>

<style scoped>
.movie-card {
  display: grid;
  grid-template-areas:
    "title title"
    "opening-crawl opening-crawl"
    "details details"
    "character-selector character-selector";
  grid-gap: 1em;
  background: #000; /* Black background */
  color: #fff; /* White text */
  border: 2px solid #ffd700; /* Yellow border */
  border-radius: 8px;
  padding: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  max-width: 600px;
  margin: 1em auto;
}

.title {
  grid-area: title;
  font-size: 2em;
  margin: 0;
  color: #ffd700; /* Yellow text */
  font-family: 'Arial Black', sans-serif;
}

.opening-crawl {
  grid-area: opening-crawl;
  font-style: italic;
  color: #f5f5f5; /* Light grey text */
}

.details {
  grid-area: details;
  list-style: none;
  padding: 0;
  margin: 0;
}

.details li {
  margin-bottom: 0.5em;
  color: #f5f5f5; /* Light grey text */
}

.details strong {
  color: #ffd700; /* Yellow text */
}

.character-selector {
  grid-area: character-selector;
}

select {
  width: 100%;
  padding: 0.5em;
  border-radius: 4px;
  border: 1px solid #ffd700; /* Yellow border */
  background: #333; /* Dark grey background */
  color: #fff; /* White text */
  font-size: 1em;
}

select:focus {
  border-color: #fff; /* White border on focus */
  outline: none;
}

label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bold;
  color: #ffd700; /* Yellow text */
}

.character-details {
  margin-top: 1em;
}
</style>