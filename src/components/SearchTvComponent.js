import { Col } from 'antd';
import React from 'react';
import '../App.css';

export default class SearchTvComponent extends React.Component {
    render() {
        return (
            <Col xxl={5} xl={5} lg={10} md={10}
                sm={20} xs={20} className="movieImg">
                {
                    this.props.poster_path ?
                        <img src={`https://image.tmdb.org/t/p/w500${this.props.poster_path}`} alt="" />
                        : null
                }
                <div>
                    <h5>Name: {this.props.name}</h5>
                    <h5>Release Date: {this.props.first_air_date}</h5>
                    <h5>Review: {this.props.vote_average}</h5>
                </div>
            </Col>
        )
    }
}