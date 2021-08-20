import React from 'react';
import { Carousel, Col, Row, Spin, List, Image } from 'antd';
import HomePicComponent from './HomePicComponent';

export default class HomeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            isLoading: false
        }
    }

    getMovies = () => {
        if (this.state.movies) {
            let result = this.state.movies.map(x => {
                return <div key={x.id} className="carousel">
                    <Image src={`https://image.tmdb.org/t/p/original/${x.backdrop_path}`} alt='' />
                    <div className="carouselName">
                        <p>{x.title}</p>
                    </div>
                </div>
            });
            return result;
        } else {
            return null;
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=dbaecfa0825899f4f66e81baf2475212&page=1`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({
                    isLoading: false,
                    movies: data.results
                })
            })

    }


    render() {
        return (
            <div className="home">
                <Spin spinning={this.state.isLoading}>
                    <Row justify={'center'}>
                        <Col xs={24} sm={24} lg={13}>
                            <Carousel autoplay dots={{className:'dot'}}>
                                {this.getMovies()}
                            </Carousel>
                        </Col>
                    </Row>

                    <Row justify={'center'}>
                        <Col xs={24} sm={24} lg={13} className="movieList">
                            <div>What's Popular</div>
                            <List
                                itemLayout="vertical"
                                size="large"
                                dataSource={this.state.movies}
                                renderItem={item => (
                                    <List.Item key={item.id}>
                                        <HomePicComponent {...item}/>
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                </Spin>
            </div>
        )
    }
}
