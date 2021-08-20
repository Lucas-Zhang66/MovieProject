import { Rate } from 'antd'
import React from 'react'

export default class HomePicComponent extends React.Component {
    render() {
        return (
            <div className="listPic">
                {
                    this.props.poster_path ?
                        <img src={`https://image.tmdb.org/t/p/w500/${this.props.poster_path}`} alt='' />
                        : null
                }

                <div>
                <h3 style={{marginBottom: 13}}>Name: {this.props.title}</h3>
                <h3>Release Date: {this.props.release_date}</h3>
                <h3>Review: <Rate allowHalf defaultValue={parseInt(this.props.vote_average) / 2}></Rate></h3>
                </div>
            </div>
        )
    }
}