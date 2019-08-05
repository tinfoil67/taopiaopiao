import React, { Component, Fragment, createRef } from 'react'

import MovieItem from '../components/MovieItem'
import shows_p1 from '../mockData/shows_p1.json'
import shows_p2 from '../mockData/shows_p2.json'
import shows_p3 from '../mockData/shows_p3.json'
import shows_p4 from '../mockData/shows_p4.json'
import shows_p5 from '../mockData/shows_p5.json'
import shows_p6 from '../mockData/shows_p6.json'
const showsData = [shows_p1, shows_p2, shows_p3, shows_p4, shows_p5, shows_p6]

class MoviesOnline extends Component {
    constructor(props){
        super(props)

        this.state = {
            showList: [],
            ifNextPage: true
        }
        this.loadingRef = createRef()
        this.page = 1
        this.pageSize = 10
    }

    componentDidMount() {
        this.io = new IntersectionObserver((entries) => {
            entries.forEach(item => {
                if (item.intersectionRatio > 0) {
                    const data = this._getData(this.page)
                    let showList = this.state.showList

                    showList = showList.concat(data)
                    const remarks = showList.map(n => parseFloat(n.remark) || 0)
                    const max = Math.max(...remarks)
                    showList.forEach(n => {
                        n.isBest = parseFloat(n.remark) === max
                    })
            
                    this.setState({
                        showList
                    })

                    if (data.length < this.pageSize || this.page > 5) {
                        if (this.io) {
                            this.io.unobserve(this.loadingRef.current)
                            this.io.disconnect()
                            this.setState({
                                ifNextPage: false
                            })
                        }
                    } else {
                        this.page ++
                    }
                }
            })
        }, {
            rootMargin: '200px 0px 0px 0px'
        })
        this.io.observe(this.loadingRef.current)
    }

    _getData(page) {
        const data = showsData[page - 1]
        return data ? data.data.returnValue : []
    }

    componentWillUnmount() {
        if (this.io) {
            this.io.unobserve(this.loadingRef.current)
            this.io.disconnect()
        }
    }

    render() {
        return (
            <Fragment>
            {this.state.showList.map((n, i) => 
                <MovieItem key={i} data={n} />
            )}
            <div ref={this.loadingRef} className="loading">
                {this.state.ifNextPage && '加载中...'}
            </div>
            </Fragment>
        )
    }
}

export default MoviesOnline