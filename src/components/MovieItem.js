/* @flow */
import React, { Component, Fragment, createRef } from 'react'
import './MovieItem.css'

import { Label, LabelOutline } from './Labels'

class MovieItem extends Component<{data: Object}> {
    posterRef: any

    constructor(props: {data: Object}) {
        super(props)

        this.posterRef = createRef()
    }

    componentDidMount() {
        if (!window.LazyPosterObserver) {
            window.LazyPosterObserver = new IntersectionObserver((entries) => {
                entries.forEach(item => {
                    const posterUrl = `https://gw.alicdn.com/${item.target.dataset.poster}`
                    if (item.target.getAttribute('style')) {
                        window.LazyPosterObserver.unobserve(this.posterRef.current)
                        return
                    };
                    const poster = document.createElement('img')
                    poster.src = posterUrl
                    poster.onload = () => {
                        item.target.setAttribute('style', `background-image:url(${posterUrl});opacity:1;`)
                    }
                })
            }, {
                rootMargin: '200px 0px'
            })
        }
        window.LazyPosterObserver.observe(this.posterRef.current)
    }

    componentWillUnmount() {
        console.log('unmount')
        window.LazyPosterObserver && window.LazyPosterObserver.unobserve(this.posterRef.current)
    }

    render() {
        const data = this.props.data
        
        return (
            <div className="movie-item">
                <div className="item-wrapper">
                    <div className="poster-wrapper">
                        <a className="poster"
                            href={`https://h5.m.taopiaopiao.com/app/dianying/pages/show-preview/index.html?from=def&showid=${data.id}&sqm=a1z2r.7661912.1.1`}
                            data-poster={data.poster}
                            ref={this.posterRef}>
                            <span className="icon-play"></span>
                        </a>
                    </div>
                    <a className="content-wrapper" href={`https://h5.m.taopiaopiao.com/app/moviemain/pages/show-detail/index.html?activityid=0&bottomtab=hide&fcode=&from=def&showid=${data.id}&showname=${data.showName}&sqm=a1z2r.7661912.1.1`}>
                        <div className="title">
                            <div className="show-name">{data.showName}</div>
                            {data.showMark && <Label showMark={data.showMark}></Label>}
                            {data.preScheduleDates && !!data.preScheduleDates.length && <LabelOutline type="warning">点映</LabelOutline>}
                        </div>
                        {data.scoreAndFavor ?
                            <div className="brief">
                                {data.scoreAndFavor.score.scoreName}&nbsp;
                                <span className="txt-warning">{data.scoreAndFavor.score.score}</span>
                            </div> :
                            <div className="brief">
                                <span className="txt-warning">{data.scoreAndFavor.favorCountDesc}</span>
                                {
                                    data.openTime &&
                                    <Fragment><span className="gap">|</span>{data.openTime}上映</Fragment>
                                }
                            </div>
                        }
                        {data.director &&
                            <div className="brief">
                                导演：{splitByBlank(data.director)}
                            </div>
                        }
                        {data.leadingRole &&
                            <div className="brief">
                                主演：{splitByBlank(data.leadingRole)}
                            </div>
                        }
                        <div className="fantastic">
                            {parseInt(data.fantastic, 10) > 10 && <LabelOutline type="primary">今日最热</LabelOutline>}
                            {parseInt(data.fantastic, 10) > 20 && <LabelOutline type="warning">一周最热</LabelOutline>}
                            {data.isBest && <LabelOutline type="info">口碑最佳</LabelOutline>}
                        </div>
                    </a>
                    <div className="btn-wrapper">
                        {
                            data.soldType === 'NORMAL' &&
                            <a href={`https://h5.m.taopiaopiao.com/app/moviemain/pages/show-cinema-list/index.html?activityid=0&bottomtab=hide&fcode=&from=def&showid=${data.id}&showname=${data.name}&sqm=a1z2r.7661912.1.1`} className="tpp-btn tpp-btn-primary">购票</a>
                        }
                        {
                            data.soldType === 'PRE' &&
                            <a href={`https://h5.m.taopiaopiao.com/app/moviemain/pages/show-cinema-list/index.html?activityid=0&bottomtab=hide&fcode=&from=def&showid=${data.id}&showname=${data.name}&sqm=a1z2r.7661912.1.1`} className="tpp-btn tpp-btn-info">预售</a>
                        }
                        {data.activities && data.activities.map(item =>
                            <span key={item.id} className="act-tag">{item.activityTag}</span>)}
                    </div>
                    {data.starMeeting &&
                        <a className="act-wrapper" href={data.starMeeting.schedulesUrl}>
                            <span className="txt-warning">{data.starMeeting.tag}</span>
                            <span className="gap">|</span>
                            {data.starMeeting.title}
                        </a>
                    }
                </div>
            </div>
        )
    }
}

function splitByBlank(str) {
    const arr = str.split(',')
    let result = ''
    arr.forEach((n) => {
        n = n.replace(/\s/g, '')
        if (result.length + n.length < 14) {
            result += `${n}`
        }
        result += ' '
    })
    return result
}

export default MovieItem