import React from 'react';
import { Col, Pagination, Radio, Row, Spin } from 'antd';
import MovieListComponent from './MovieListComponent';

export default class MovieComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            isLoaing: false,
            movieType: 'now_playing',
            pageIndex: 1,
            totalPages: 0,
            totalResults: 0
        }
    }

    refreshData = (type, page) => {
        this.setState({ isLoaing: true, movies: [] });
        fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=dbaecfa0825899f4f66e81baf2475212&page=${page}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({
                    isLoaing: false,
                    movies: data.results,
                    totalPages: data.total_pages,
                    totalResults: data.total_results,
                    pageIndex: data.page
                })
            })
    }

    handleOnChange = (e) => {
        this.setState({ movieType: e.target.value, pageIndex: 1 });
        this.refreshData(e.target.value, 1);
    }

    handlePageChange = (page) => {
        this.setState({pageIndex: page});
        this.refreshData(this.state.movieType, page);
    }

    getRow = () => {
        let result = [];
        let rows = [];

        if(this.state.movies) {
            let temp = [];
            for (let i = 0; i < this.state.movies.length; i++) {
                temp.push(<MovieListComponent key={this.state.movies[i].id} {...this.state.movies[i]}/>)

                if(temp.length === 4) {
                    result.push(temp);
                    temp = [];
                }
                
            }

            for (let i = 0; i < result.length; i++) {
                rows.push(
                    <Row justify="center" key={i}>
                        {result[i]}
                    </Row>
                )
                
            }
            return rows;
        }
        else {
            return null;
        }
    }

    componentDidMount() {
        this.refreshData(this.state.movieType, this.state.pageIndex);
    }


    render() {
        return (
            <div className="moviePage">
                <Spin spinning={this.state.isLoaing}>
                    <Row justify="center">
                        <Col sm={22} md={21} className="radioGroup">
                            <Radio.Group onChange={this.handleOnChange} value={this.state.movieType}>
                                <Radio value={'now_playing'}>Now Playing</Radio>
                                <Radio value={'popular'}>Popuplar</Radio>
                                <Radio value={'top_rated'}>Top Rated</Radio>
                                <Radio value={'upcoming'}>Upcoming</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>

                    <Row justify="center">
                        <Col sm={22} md={21} className="radioGroup">
                        {
                            this.state.movies ?
                            <Pagination
                                current={this.state.pageIndex}
                                defaultPageSize={20}
                                total = {this.state.totalResults}
                                showSizeChanger={false}
                                onChange={this.handlePageChange}
                            />
                            :null
                        }
                            

                        </Col>
                    </Row>

                    {
                        this.getRow()
                    }
                </Spin>
            </div>
        )
    }
}