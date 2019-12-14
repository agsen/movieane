import React, { Component, useState } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import './MovieDetail.scss';

const api_key = 'a4a36a5773994090662c9d1e6ab1fbbc';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

class MovieDetail extends Component {
    state = {
        detail: {},
        videos: [],
        reviews: [],
        activeTab: '1',
    }


    getDetail = () => {
        const { match } = this.props;
        axios.get(`/movie/${match.params.id}?api_key=${api_key}`)
            .then((res) => {
                this.setState({
                    detail: res.data
                })
            })
    }
    getVideo = () => {
        const { match } = this.props;
        axios.get(`/movie/${match.params.id}/videos?api_key=${api_key}`)
            .then((res) => {
                this.setState({
                    videos: res.data.results
                })
            })
    }
    getReviews = () => {
        const { match } = this.props;
        axios.get(`/movie/${match.params.id}/reviews?api_key=${api_key}`)
            .then((res) => {
                this.setState({
                    reviews: res.data.results
                })
            })
    }

    componentDidMount() {
        this.getDetail();
        this.getReviews();
        this.getVideo();

    }

    renderVideos = () => {
        const { videos } = this.state;
        return videos.map((item, i) => {
            let url = '';
            if (item.site === "YouTube") {
                url = `https://www.youtube.com/embed/${item.key}`
            }

            return (
                <div className="video-item-container">
                    <p>{item.name}</p>
                    <iframe
                        width="100%"
                        height="500px"
                        src={url}>
                    </iframe>
                </div>)
        })
    }

    renderReviews = () => {
        const { reviews } = this.state;
        if (reviews.length > 0) {
            return reviews.map((item, i) => {
                return (
                    <div className="review-item">
                        <h3>{item.author}</h3>
                        <p>{item.content}</p>

                    </div>)
            })
        } else {
            return <p>No review </p>
        }

    }

    toggleTab = (tab) => {
        const { activeTab } = this.state;
        if (activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }

    renderTab = () => {
        const { activeTab } = this.state;
        return (<div className="tab-detail-container">
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { this.toggleTab('1'); }}
                    >
                        Video Trailer
            </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { this.toggleTab('2'); }}
                    >
                        Reviews
            </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab} className="tab-content">
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            {this.renderVideos()}
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Col sm="12">
                            {this.renderReviews()}
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>)

    }

    render() {
        console.log(this.state)
        const { detail } = this.state;


        return (
            <Container className="detail-container">
                <div className="bg"></div>
                <Row>
                    <Col sm="12" md="6"><img
                        className="poster-img"
                        src={'https://image.tmdb.org/t/p/w400' + detail.poster_path} /></Col>
                    <Col sm="12" md="6">
                        <Row className="movie-info">
                            <h1>{detail.title}</h1>
                            <p>{detail.overview}</p>
                            <h2>{detail.vote_average}</h2>
                            <Row className="genres-container">
                                {detail.genres && detail.genres.map((genre, i) => {
                                    return (<span>
                                        {genre.name}
                                    </span>)
                                })}
                            </Row>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col md="12" className="tab-container">
                        {this.renderTab()}
                    </Col>
                </Row>
            </Container >

        )
    }
}

export default MovieDetail;
