/* @flow */

import React, { Component, Fragment } from 'react'

import MovieItem from '../components/MovieItem'
import soonshows from '../mockData/soonshows.json'

class MoviesComming extends Component<{}, {showList: Array<Object>}> {
    constructor(props: any) {
        super(props)

        this.state = {
            showList: []
        }
    }

    componentDidMount() {
        this.setState({
            showList: this._formatData(soonshows.data.returnValue)
        })
    }

    _formatData = (data: Array<Object>) => {
        const result = []
        const groupedData = {}

        data.forEach(n => {
            if (!groupedData[n.openTime]) {
                groupedData[n.openTime] = []
            }

            groupedData[n.openTime].push(n)
        })

        Object.keys(groupedData).forEach(n => {
            result.push({
                title: n,
                items: groupedData[n]
            })
        })

        return result
    }

    render() {
        return (
            // $FlowIgnore
            this.state.showList.map((group, index) => 
                <Fragment key={index}>
                    <div className="g-hdr">{group.title}</div>
                    {
                        group.items.map((item, i) =>
                            <MovieItem key={i} data={item} />)
                    }
                </Fragment>
            )
        )
    }
}

export default MoviesComming