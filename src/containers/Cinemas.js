/* @flow */

import React, { Component } from 'react'

import CitySwitch from '../containers/CitySwitch'
import CinemaFilter from '../components/CinemaFilter'
import CinemaList from '../components/CinemaList'

import './Cinemas.css'

import { data } from '../mockData/cinemaListPage'
const { returnValue: cinemaListPageData } = data

class Cinema extends Component<*> {
    container: Element|null

    constructor(props?: any) {
        super(props)

        this.container = document.getElementById('root')
    }

    componentDidMount(){
        // fetch
        console.log(cinemaListPageData)
    }

    render() {
        return(
            <div className="cinemas-page">
                <div className="header">
                    <CitySwitch />
                    {this.container && <CinemaFilter data={cinemaListPageData.cinemaFilter}
                        containerDom={this.container} />}
                </div>
                <CinemaList data={cinemaListPageData.cinemas} />
            </div>
        )
    }
}

export default Cinema