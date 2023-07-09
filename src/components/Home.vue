<script>
import {mapGetters} from 'vuex';
import AppHeader from './AppHeader.vue';
import Loader from './Loader.vue';
import Movie from './Movie.vue';

export default{
  name:'Home',
  components:{
    AppHeader,
    Loader,
    Movie,
  },
  data(){
    return{
      isLoading:true
    }
  },
  computed:{
    // movies(){
    //   return $store.state.movies;
    // }
    ...mapGetters([
      'movies',
      'groupedMovies'
    ])
  },
  created(){
  this.$store.dispatch("fetchMovies").then(()=>{
    this.isLoading=false;
  });
  }
}
</script>

<template>
  <section>
  <AppHeader/>
  <Loader v-if="isLoading"/>
    <section class="container py-5">
      <div v-for="group in groupedMovies" class="card-deck">
      <Movie
      v-for="movie in group"
      :key="movie.id"
      :movie="movie"/>
    </div>
    </section>
  </section>
</template>


<style>
.card-deck{
  margin-bottom:30px;
}
</style>
