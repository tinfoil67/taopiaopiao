import React, { Component } from 'react'

import CitySwitch from '../containers/CitySwitch'
import CinemaFilter from '../components/CinemaFilter'
import CinemaList from '../components/CinemaList'

import './Cinemas.css'

import { data } from '../mockData/cinemaListPage'
const { returnValue: cinemaListPageData } = data

class Cinema extends Component {
    componentDidMount(){
        // fetch
        console.log(cinemaListPageData)
    }

    _getContainer(){
        return document.getElementById('root')
    }

    render() {
        return(
            <div className="cinemas-page">
                <div className="header">
                    <CitySwitch />
                    <CinemaFilter data={cinemaListPageData.cinemaFilter}
                        containerDom={this._getContainer()} />
                </div>
                <CinemaList data={cinemaListPageData.cinemas} />
            </div>
        )
    }
}

export default Cinema