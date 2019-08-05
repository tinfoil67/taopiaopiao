import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'

import CitySwitch from '../containers/CitySwitch'
import MoviesOnline from '../containers/MoviesOnline'
import MoviesComming from '../containers/MoviesComming'

import './Movies.css'

class Movies extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }
    render() {
        return (
            <div className="movies-page">
                <div className="header">
                    <CitySwitch />
                    <div className="tab-group">
                        <NavLink exact to={this.props.match.url}>正在热映</NavLink>
                        <NavLink to={`${this.props.match.url}/comming`}>即将上映</NavLink>
                        <div className="decoration-line"></div>
                    </div>
                </div>
                <div className="movie-list">
                    <Route exact path={this.props.match.path} component={MoviesOnline} />
                    <Route path={`${this.props.match.path}/comming`} component={MoviesComming} />
                </div>
            </div>
        )
    }
}

export default Movies