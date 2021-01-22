import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';

class Home extends React.Component{
  state = {
    isLoading :true,
    movies : [],
  }
  
  //async : getMovies란 함수는 시간이 필요하다는 것을 알려줌
  getMovies =async () => {
    const{
      data: {
        data: {movies},
      }
    } =  await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    this.setState({movies, isLoading: false});

    console.log(movies);
  }; //await: axios.get이 실행하는동안 기다리라고 해주는 것

  componentDidMount(){
    this.getMovies();
  }
  render(){
    const {isLoading, movies} = this.state;
    return (<section className ="container"> {isLoading ? (
      <div className = "loader">
        <span className = "loader__text">Loading...</span> </div> ) : (
          <div className = "movies">
            {movies.map((movie) => {
            return <Movie
                key = {movie.id}
                id ={movie.id}
                year ={movie.year}
                title = {movie.title}
                summary = {movie.summary}
                poster = {movie.medium_cover_image} 
                genres = {movie.genres}
        />
      })}
      </div>
    )}</section> 
    ); 
  }
}

export default Home;