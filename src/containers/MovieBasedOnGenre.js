import React, { Component } from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import { Container, Row, Col } from 'reactstrap';
import './Home.scss';
import { Link } from "react-router-dom";

const api_key = 'a4a36a5773994090662c9d1e6ab1fbbc';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

class MovieBasedOnGenre extends Component {
    state = {
        genres: [],
        movies: [],
        lastPage: 1
    }

    getGenre = () => {
        axios.get(`/genre/movie/list?api_key=${api_key}`)
            .then((res) => {
                this.setState({
                    genres: res.data.genres
                })
            })
    }

    getMovies = (page) => {
        axios.get(`/movie/popular?api_key=${api_key}&page=${page}`)
            .then((res) => {
                this.setState({
                    movies: res.data.results
                })
            })
    }


    renderGenre = () => {
        const { genres } = this.state;
        return (
            <div className="genre-container">
                {genres.map((item, i) => {
                    return (
                        <div className="genre-item" key={i}>
                            {item.name}
                        </div>
                    )
                })}
            </div>)
    }


    renderMovies = () => {
        const { movies, genres } = this.state;
        const { match } = this.props;
        const genre = match.params.name;
        let filteredMovies = [];
        //
        const genreObj = genres.find((item) => item.name.toLowerCase() == genre.toLowerCase());
        let genreId = null;
        if (genreObj) {
            genreId = genreObj.id
        }

        if (movies.length > 0 && genreId != null) {
            filteredMovies = movies.filter((m) => {
                let foundIndex = m.genre_ids.findIndex((ge) => ge === genreId)
                return foundIndex !== -1
            })
        }
        return (
            <div className="movie-container">
                {filteredMovies.map((item, i) => {
                    return (
                        <Movie item={item} key={i} />
                    )
                })}
            </div>)
    }

    loadMore = () => {
        const { lastPage, movies } = this.state;
        axios.get(`/movie/popular?api_key=${api_key}&page=${lastPage + 1}`)
            .then((res) => {
                this.setState({
                    movies: [...movies, ...res.data.results],
                    lastPage: lastPage + 1
                })
            })

    }

    componentDidMount() {
        this.getGenre();
        this.getMovies(1);

    }

    render() {
        console.log(this.state)
        const { match } = this.props;
        const genre = match.params.name;
        return (
            <Container className="container-page">
                <Row>
                    <p className="header-subtitle">Movie Genre </p>
                    <h1 className="header-title">{genre}</h1>
                </Row>
                <Row>
                    <Col md="12" > <Link to="/genre" className="btn-show-genre">Show All Genres</Link></Col>
                </Row>
                <Row>
                    {this.renderMovies()}
                </Row>
                <button
                    className="btn-load-more"
                    onClick={this.loadMore}>Load More ...</button>
            </Container>

        )
    }
}

export default MovieBasedOnGenre;
