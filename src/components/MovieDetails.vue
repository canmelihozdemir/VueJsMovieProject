<script>

import Loader from './Loader.vue';
import BackdropImage from './BackdropImage.vue';
import Poster from './Poster.vue';

export default{
 
  data(){
    return{
      hasDetails:false,
      isLoading:true
    }
  },
  components:{
    Loader,
    BackdropImage,
    Poster,
  },
  computed:{
    movieId(){
      return this.$route.params.id;
    },
    movie(){
      return this.$store.state.movieDetails[this.movieId];
    },
    runtime(){
      // const runtime=this.movie.runtime;
      const {runtime}=this.movie;
      const hours=Math.floor(runtime/60);
      const minutes=runtime-(60*hours)
      return `${hours}h ${minutes}m`;
    },
    trailers() {
      const trailers = [];
      this.movie.videos.results.forEach((video) => {
        if (video.type === 'Trailer') {
          //  console.log(video);
          trailers.push({
            thumbnail: `https://i.ytimg.com/vi/${video.key}/sddefault.jpg`,
            url: `https://youtube.com/watch?v=${video.key}`,
          });
        }
      });
      // console.log(trailers);
      return trailers;
    },
    ticketsPath() {
      return `/movie/${this.movie.id}/tickets`;
    }
  },
  methods:{
    castAvatar(path){
      return `https://image.tmdb.org/t/p/w45${path}`;
    }
  },
  created(){
    // const movieId=this.$route.params.id;
    // console.log(movieId);

    this.$store.dispatch('fetchMovieDetails',this.movieId).then(()=>{
      // console.log("data fetched");
      this.isLoading=false;
      this.hasDetails=true;
    });
  }
}

</script>



<template>
  <section>
    <Loader v-if="isLoading"/>
    <section v-if="hasDetails">
    <BackdropImage :imageName="movie.poster_path" class="backdrop-image"/>
    <div class="container pt-5">
      <div class="row">
        <div class="col-sm-4">
          <Poster :posterName="movie.poster_path" class="poster"/>
        </div>
        <div class="col-sm-8 details">
          <h2>{{ movie.title }} <a :href="ticketsPath" type="button" class="btn btn-success buy-btn">Get Tickets</a></h2>
          <p>{{ movie.overview }}</p>
          <div>Runtime: {{runtime}}</div>
          <div>Average Rating: {{movie.vote_average.toFixed(1)}}</div>
          <div>Production Company: {{movie.production_companies[0].name}}</div>
          <div>Release Date: {{movie.release_date}}</div>
          <h4 class="mb-3">Cast</h4>

          <img v-for="person in movie.cast" :src="trailers[0].thumbnail" class="cast-avatar">

          <h4 class="mb-3">Trailers</h4>
          <a :href="trailer.url" v-for="trailer in trailers" target="_blank" class="trailer-link">
            <div class="play-icon"></div>
            <img :src="trailer.thumbnail" class="thumbnail" />
          </a>
        </div>
      </div>
    </div>
  </section>
  </section>
</template>

<style scoped=true>
.backdrop-image{
  width: 100%;
  height: 100vh;
  position: absolute;
  top:0;
  left:0;
  filter: blur(30px);
  transform: scale(1.1);
}

h4{
  margin-top: 15px;
}

.details{
  color:#FFF;
}

.cast-avatar{
  width:45px;
  height:45px;
  border-radius:45px;
  border: 2px solid #fff;
  box-sizing: border-box;
  margin-right: 10px;
}


.thumbnail {
  width: 150px;
  height: 110px;
}
.trailer-link {
  width: 150px;
  height: 110px;
  display: inline-block;
  margin-right: 20px;
  position: relative;
}

.play-icon {
  background-image: url(http://f.acet.me/LXIk.png);
  background-size: 75px 75px;
  position: absolute;
  width: 75px;
  height: 75px;
  top: 18px;
  left: 36px;
}

/* .poster{
  width:100%;
} */
</style>
