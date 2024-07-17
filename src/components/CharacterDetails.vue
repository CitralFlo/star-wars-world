<template>
  <div v-if="character">
    <h2>{{ character.name }}</h2>
    <ul>
      <li>Height: {{ character.height }}</li>
      <li>Mass: {{ character.mass }}</li>
      <li>Hair Color: {{ character.hair_color }}</li>
      <li>Skin Color: {{ character.skin_color }}</li>
      <li>Eye Color: {{ character.eye_color }}</li>
      <li>Birth Year: {{ character.birth_year }}</li>
    </ul>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, PropType } from 'vue';
import { getCharacter, Character } from './MoviesFetch';

export default defineComponent({
  name: 'CharacterDetails',
  props: {
    characterUrl: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props) {
    const character = ref<Character | null>(null);

    const fetchCharacter = async () => {
      try {
        character.value = await getCharacter(props.characterUrl);
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    };

    watch(() => props.characterUrl, fetchCharacter);

    onMounted(fetchCharacter);

    return {
      character
    };
  }
});
</script>

<style scoped>
/* Add your styles here */
</style>
