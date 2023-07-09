<script>

export default{
  name:'BackdropImage',
  props:{
    imageName:{
      type:String,
      required:true
    }
  },
  computed:{
    imagePath(){
      return `https://image.tmdb.org/t/p/w1280${this.imageName}`;
    }
  }
}

</script>

<template>
  <img :src="imagePath" alt="">
</template>
