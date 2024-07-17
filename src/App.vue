<script setup>
import MovieList from "@/components/MovieList.vue";

</script>

<template>
  <div class="container">
    <header class="header">
      <img alt="Star Wars logo" class="logo" src="/hero-image.png"/>
    </header>
    <main class="main-content">
      <MovieList />
    </main>
  </div>
</template>

<style scoped>
.container {
  background-color: #000; /* Black background for the entire container */
  color: #fff; /* White text for better readability on black background */
  min-height: 100vh; /* Full height of the viewport */
  padding: 0 1rem; /* Add padding on the sides */
}

/* Header styling */
.header {
  text-align: center; /* Center the logo */
  margin-bottom: 2rem; /* Space below the header */
  padding: 1rem 0; /* Padding for the header */
}

/* Logo styling */
.logo {
  max-width: 100%; /* Ensure the logo scales with the container */
  height: auto; /* Maintain aspect ratio */
  display: block;
  margin: 0 auto; /* Center the logo horizontally */
}

/* Main content styling */
.main-content {
  display: flex;
  justify-content: center; /* Center the movie list */
  padding: 1rem 0; /* Add padding above and below the content */
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .container {
    padding: 0 2rem; /* Increase padding on larger screens */
  }

  .header {
    padding: 1.5rem 0; /* Increase padding for larger screens */
  }
}
</style>
