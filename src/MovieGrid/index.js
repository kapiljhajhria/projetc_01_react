import React from 'react';
import MoviePoster from "../MoviePoster";
import './styles.css'
import '../moviedatabase'
import moviesInfoList from "../moviedatabase";

class MoviesGrid extends React.Component {
    getMoviesRow(){
        let moviesDiv=[];
        this.props.allMoviesData.forEach((movie)=>moviesDiv.push(
            <MoviePoster imglink={movie.posterurl} genre={movie.genres.join(', ')} contentRating={movie.contentRating} movieName={movie.title}     > </MoviePoster>
        ));
        return moviesDiv;
    }
    render() {
        return (
            <div className="moviesgrid">
            {/*    call function moviesRow here*/}
                {this.getMoviesRow()}

            </div>
        );
    }
}


export default MoviesGrid;