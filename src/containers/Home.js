import React, { Component } from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import { Container, Row, Col } from 'reactstrap';
import './Home.scss';
import { Link } from "react-router-dom";

const api_key = 'a4a36a5773994090662c9d1e6ab1fbbc';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

class Home extends Component {
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
        const { movies } = this.state;
        return (
            <div className="movie-container">
                {movies.map((item, i) => {
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
        return (
            <Container className="container-page">
                <Row>
                    <h1 className="header-title">Movie List</h1>
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

export default Home;
