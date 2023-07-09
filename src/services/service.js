import axios from "axios";
export default {
  fetchMovies() {
    return axios
      .get(
        ""
      )
      .then(res => res.data);
  },
  fetchMovieTimes() {
    return firebase
      .database()
      .ref("/movieTimes")
      .once("value");
  },
  fetchMovieDetails(id) {
    return axios
      .get(
        ``
      )
      .then(res => res.data);
  }
};
