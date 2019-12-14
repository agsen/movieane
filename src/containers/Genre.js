import React, { Component } from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import { Container, Row, Col } from 'reactstrap';
import './Genre.scss';
import { Link } from "react-router-dom";

const api_key = 'a4a36a5773994090662c9d1e6ab1fbbc';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

class Genre extends Component {
    state = {
        genres: []
    }


    getRandomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    getGenre = () => {
        axios.get(`/genre/movie/list?api_key=${api_key}`)
            .then((res) => {
                this.setState({
                    genres: res.data.genres
                })
            })
    }


    renderGenre = () => {
        const { genres } = this.state;
        return (
            <div className="genre-container">
                {genres.map((item, i) => {
                    return (
                        <Link
                            className="genre-item"
                            to={`/genre/${item.name}`}
                            style={{ backgroundColor: this.getRandomColor() }}>
                            <div >
                                {item.name}
                            </div>
                        </Link>
                    )
                })
                }
            </div >)
    }




    componentDidMount() {
        this.getGenre();

    }

    render() {
        console.log(this.state)
        return (
            <Container className="container-page">
                <Row>
                    <h1 className="header-title">Discover Genre</h1>
                    <div>
                        {this.renderGenre()}
                    </div>
                </Row>
            </Container>

        )
    }
}

export default Genre;
