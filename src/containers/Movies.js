/* @flow */

import React from 'react'
import { Route, NavLink } from 'react-router-dom'

import CitySwitch from '../containers/CitySwitch'
import MoviesOnline from '../containers/MoviesOnline'
import MoviesComming from '../containers/MoviesComming'

import './Movies.css'

function Movies (props: any) {
    return (
        <div className="movies-page">
            <div className="header">
                <CitySwitch />
                <div className="tab-group">
                    <NavLink exact to={props.match.url}>正在热映</NavLink>
                    <NavLink to={`${props.match.url}/comming`}>即将上映</NavLink>
                    <div className="decoration-line"></div>
                </div>
            </div>
            <div className="movie-list">
                <Route exact path={props.match.path} component={MoviesOnline} />
                <Route path={`${props.match.path}/comming`} component={MoviesComming} />
            </div>
        </div>
    )
}

export default Movies