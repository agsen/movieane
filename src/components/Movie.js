import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button
} from 'reactstrap';
import './Movie.scss';
import { Link } from "react-router-dom";

class Movie extends Component {


    render() {
        const { item } = this.props;
        return (
            <div className="container-movie-item">
                <Link to={`/movie/${item.id}`}>
                    <Card className="card">
                        <CardImg
                            top
                            height="360px"
                            width="100%"
                            src={'https://image.tmdb.org/t/p/w200' + item.poster_path} alt="Card image cap" />
                        <CardBody>
                            <h2>{item.title}</h2>
                            <p>{item.overview.slice(0, 50) + "..."}</p>
                            <h3>{item.vote_average}</h3>
                        </CardBody>
                    </Card>
                </Link>
            </div>
        )
    }
}

export default Movie;
