import React from 'react'
import { Col, Pagination, Row, Select, Spin } from 'antd';
import { Input } from 'antd';
import MovieListComponent from './MovieListComponent';
import SearchTvComponent from './SearchTvComponent';

const { Search } = Input;

const { Option } = Select;
export default class SearchComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: null,
            isLoading: false,
            types: 'movie',
            totalResult: 0,
            totalPages: 0,
            pageIndex: 1,
            query: '',
            pageSize: 20
        }
    }

    refreshData = (type, term, page) => {
        this.setState({ isLoading: true, movies: [] });
        fetch(`https://api.themoviedb.org/3/search/${type}?api_key=dbaecfa0825899f4f66e81baf2475212&query=${term}&page=${page}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({
                    totalPages: data.total_pages,
                    totalResult: data.total_results,
                    pageIndex: data.page,
                    movies: data.results,
                    isLoading: false
                })
            })

    }

    handleOnChange = (value) => {
        this.setState({ types: value, movies: null, totalPages: 0, totalResult: 0, query: '', pageIndex: 1 })
    }

    handleOnSearch = (value) => {
        if (value) {
            this.refreshData(this.state.types, value, 1);
        }
    }

    handleSearchChange = (e) => {
        this.setState({ query: e.target.value });
    }

    handlePageChange = (page) => {
        this.setState({ pageIndex: page });
        this.refreshData(this.state.types, this.state.query, page);
    }

    getRow = () => {
        let results = [];
        let rows = [];

        if (this.state.movies) {
            let temp = [];
            for (let i = 0; i < this.state.movies.length; i++) {

                if (temp.length === 4) {
                    results.push(temp);
                    temp = [];
                }

                if (this.state.types === 'movie') {
                    temp.push(<MovieListComponent
                        key={this.state.movies[i].id}
                        {...this.state.movies[i]}
                    />)
                } else {
                    temp.push(
                        <SearchTvComponent
                            key={this.state.movies[i].id}
                            {...this.state.movies[i]}
                        />
                    )
                }
            }

            results.push(temp);

            for (let i = 0; i < results.length; i++) {
                rows.push(
                    <Row justify="center" key={i}>
                        {results[i]}
                    </Row>
                )

            }
            return rows;
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="moviePage">
                <Spin spinning={this.state.isLoading}>
                    <Row justify="center">
                        <Col sm={20} md={21} className="radioGroup">
                            <Select className="select" defaultValue="movie" style={{width: 120, marginRight: 5}}>
                                <Option value="movie">Movie</Option>
                                <Option value="tv">TV Series</Option>
                            </Select>
                            <Search
                                placeholder="Search Here"
                                onSearch={this.handleOnSearch}
                                style={{ width: 180, marginTop: 3, marginBottom: 3 }}
                                value={this.state.query}
                                onChange={this.handleSearchChange}
                            />
                        </Col>
                    </Row>

                    <Row justify="center">
                        <Col sm={22} md={21} className="radioGroup">
                            {
                                this.state.movies ?
                                    <Pagination
                                        current={this.state.pageIndex}
                                        defaultPageSize={this.state.pageSize}
                                        total={this.state.totalResult}
                                        showSizeChanger={false}
                                        onChange={this.handlePageChange}
                                    />
                                    : null
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