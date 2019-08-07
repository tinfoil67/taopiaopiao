/* @flow */

import React, { Component } from 'react'
import './CinemaList.css'

import { LabelOutline } from './Labels'

class CinemaList extends Component<{keyword?: string, data: Array<any>}> {
    _replaceKeywordByHtml = (str: string) => {
        const keyword = this.props.keyword
        let result = keyword ? str.replace(keyword, `<span class="red">${keyword}</span>`) : str
        return { __html: result }
    }

    render() {
        return (
            <div className="cinema-list">
            {this.props.data.map(cinema => 
                <div className="item-wrapper" key={cinema.cinemaId}>
                    <a className="item-content">
                        <div className="list-title-wrapper">
                            <span dangerouslySetInnerHTML={this._replaceKeywordByHtml(cinema.cinemaName)} 
                                className="list-title"></span>
                            <span className="list-price">
                                {(parseInt(cinema.minPrice, 10) / 100).toFixed(1)}
                                <span>
                                    <span className="primary-color">元</span>起
                                </span>
                            </span>                
                        </div>
                        <div className="list-address">
                            <div dangerouslySetInnerHTML={this._replaceKeywordByHtml(cinema.address)} 
                                className="list-location"></div>
                            <span className="list-distance">{cinema.distance}km</span>
                            <div className="list-search-distance"></div>
                        </div>
                        <div className="list-status">
                            {
                                cinema.displaySupports.map(s => 
                                    <LabelOutline type="info" key={s}>{s}</LabelOutline>)
                            }
                        </div>
                        <ul className="list-activity">
                            {cinema.activityTags.map(a => 
                                <li className="activity-item" key={a.title}>
                                    <span className={`icon-activity icon-${a.tagType}`}>{a.tag}</span>{a.title}
                                </li>
                            )}
                        </ul>
                    </a>
                </div>
            )}
            </div>
        )
    }
}

export default CinemaList