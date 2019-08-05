import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import debounce from 'lodash.debounce'

import CinemaList from './CinemaList'
import './CinemaFilter.css'

import searchCinemaData from '../mockData/searchCinemas.json'

class CinemaFilter extends Component {
    constructor(props) {
        super(props)

        const areas = this.props.data.areaMallFilters
        const subAreas = areas[0].subFilters || []
        this.state = {
            isRegionSelectorShow: false,
            isSortSelectorShow: false,
            isSupportSelectorShow: false,
            isCinemaSearchShow: false,
            areaGroupFilters: areas || [],
            currentAreaGroup: areas[0] || {},
            subAreaFilters: subAreas || [],
            currentSubArea: subAreas[0] || {},
            regionType: 'mall',
            currentSort: this.props.data.sortTypeFilters[0] || {},
            currentSupport: this.props.data.supportFilters[0] || {},
            regionName: '全城',
            sortName: '综合排序',
            supportName: '特色',
            isSearchLoading: false,
            isSearchFail: false,
            searchResult: [],
            searchKeyword: '',
            filterData: {
                areaCode: (areas[0] || {}).code,
                subAreaCode: (subAreas[0] || {}).code,
                regionType: 'mall',
            }
        }

        this.emitChangeDebounced = debounce(this._searchCinemas, 250)
    }

    componentDidMount() {
        // console.log(this.state.searchResult)
    }

    componentDidUpdate(prevProps, prevState) {
        
    }

    componentWillUnmount() {
        this.emitChangeDebounced.cancel();
    }

    regionToggleHandler = () => {
        this.setState({
            isSortSelectorShow: false,
            isSupportSelectorShow: false,
            isCinemaSearchShow: false,
            isRegionSelectorShow: !this.state.isRegionSelectorShow
        })
    }

    sortToggleHandler = (e) => {
        this.setState({
            isRegionSelectorShow: false,
            isSupportSelectorShow: false,
            isCinemaSearchShow: false,
            isSortSelectorShow: !this.state.isSortSelectorShow
        })
        console.log(e.target)
    }

    supportToggleHandler = (e) => {
        this.setState({
            isRegionSelectorShow: false,
            isSortSelectorShow: false,
            isCinemaSearchShow: false,
            isSupportSelectorShow: !this.state.isSupportSelectorShow
        })
        console.log(e.target)
    }

    searchShowHandler = (e) => {
        this.setState({
            isRegionSelectorShow: false,
            isSortSelectorShow: false,
            isSupportSelectorShow: false,
            isCinemaSearchShow: true
        })
        console.log(e.target)
    }

    searchHideHandler = () => {
        this.setState({
            isCinemaSearchShow: false
        })
    }

    selectRegionTypeHandler = (e) => {
        const type = e.target.dataset.type
        this.setState({
            regionType: type
        }, () => {
            if (type === 'subway') {
                this.setState({
                    areaGroupFilters: this.props.data.subwayStationFilters
                })
            } else {
                this.setState({
                    areaGroupFilters: this.props.data.areaMallFilters
                })
            }
            this._updateSubArea(0)
        })
    }

    selectAreaGroupHandler = (e) => {
        if (e.target.tagName === 'UL') return;
        let index = e.target.dataset.index
        if (index === undefined) {
            index = e.target.parentNode.dataset.index
        }
        this._updateSubArea(index)
    }

    _updateSubArea = (index) => {
        let currentAreaGroup = {};
        if (this.state.regionType === 'subway') {
            currentAreaGroup = this.props.data.subwayStationFilters[index]
        } else {
            currentAreaGroup = this.props.data.areaMallFilters[index]
        }
        this.setState({
            currentAreaGroup,
            subAreaFilters: currentAreaGroup.subFilters,
            // currentSubArea: currentAreaGroup.subFilters[0]
        })

        // 二级区域没有内容时, 默认范围取当前一级区域的 '全部'
        if (!currentAreaGroup.subFilters.length) {
            this.setState({
                isRegionSelectorShow: false
            }, this._updateRegionFilterBar)
        }
    }

    selectSubAreaHandler = (e) => {
        if (e.target.tagName === 'UL') return;
        let index = e.target.dataset.index
        if (index === undefined) {
            index = e.target.parentNode.dataset.index
        }
        this.setState({
            currentSubArea: this.state.subAreaFilters[index],
            isRegionSelectorShow: false
        }, this._updateRegionFilterBar)
    }

    _updateRegionFilterBar = () => {
        const currentAreaGroup = this.state.currentAreaGroup
        const currentSubArea = this.state.currentSubArea
        let regionName = ''

        if (currentSubArea && currentSubArea.code !== 'ALL') {
            regionName = currentSubArea.title
        } else {
            if (currentAreaGroup.code === 'ALL') {
                regionName = '全城'
            } else {
                regionName = currentAreaGroup.title
            }
        }
        this.setState({
            regionName
        })

        this._updateCinemaList()
    }

    selectSortHandler = (e) => {
        const index = e.target.dataset.index
        const sort = this.props.data.sortTypeFilters[index]
        this.setState({
            currentSort: sort,
            sortName: sort.title,
            isSortSelectorShow: false
        }, this._updateCinemaList)
    }

    selectSuportHandler = (e) => {
        const index = e.target.dataset.index
        const support = this.props.data.supportFilters[index] || {}
        let supportName = support.code ? support.title : '特色'
        this.setState({
            currentSupport: support,
            supportName,
            isSupportSelectorShow: false
        }, this._updateCinemaList)
    }

    _updateCinemaList = () => {
        this.setState({
            filterData: {
                areaCode: this.state.currentAreaGroup.code,
                subAreaCode: this.state.currentSubArea.code,
                regionType: this.state.regionType,
            }
        })
        // TODO: ajax请求, 更新影院列表
        // console.log('updateCinemaList: ', this)
    }

    clearKeywordHandler = () => {
        this.setState({
            searchKeyword: ''
        })
    }

    searchIptChangeHandler = (e) => {
        const keyword = e.target.value
        this.setState({
            searchKeyword: keyword
        })
        this.emitChangeDebounced(keyword)
    }

    _searchCinemas = (keyword) => {
        if (keyword === 'fail') {
            this.setState({
                isSearchFail: true,
                isSearchLoading: false,
                searchResult: []
            })
        } else {
            this.setState({
                isSearchFail: false,
                isSearchLoading: true,
                searchResult: []
            })
            setTimeout(() => {
                this.setState({
                    isSearchLoading: false,
                    searchResult: searchCinemaData.data.returnValue.cinemas
                })
            }, 300)
        }
        console.log(keyword)
    }

    hidePanelHandler = () => {
        this.setState({
            isRegionSelectorShow: false,
            isSortSelectorShow: false,
            isSupportSelectorShow: false
        })
    }

    render() {
        // console.log(this.state.currentAreaGroup, this.state.currentSubArea)
        return (
            <div className="filter-wrapper">
                <div className="filter-tabs">
                    <div 
                        className={'filter-tab ' + (this.state.isRegionSelectorShow ? 'active' : '')} 
                        onClick={this.regionToggleHandler}>
                        <div className="title">{this.state.regionName}</div>
                        <div className="arrow"></div>
                    </div>
                    
                    <div 
                        className={'filter-tab ' + (this.state.isSortSelectorShow ? 'active' : '')} 
                        onClick={this.sortToggleHandler}>
                        <div className="title">{this.state.sortName}</div>
                        <div className="arrow"></div>
                    </div>
                    
                    <div 
                        className={'filter-tab ' + (this.state.isSupportSelectorShow ? 'active' : '')} 
                        onClick={this.supportToggleHandler}>
                        <div className="title">{this.state.supportName}</div>
                        <div className="arrow"></div>
                    </div>
                    
                    <div className="cinema-search" 
                        onClick={this.searchShowHandler}>
                        <div className="icon-search"></div>
                    </div>
                </div>
                {this.state.isRegionSelectorShow && createPortal(
                    <div className="region-selector filter-panel">
                        <div className="region-type"
                            onClick={this.selectRegionTypeHandler}>
                            <div 
                                className={this.state.regionType === 'mall' ? 'active' : ''} 
                                data-type="mall">商圈</div>
                            <div 
                                className={this.state.regionType === 'subway' ? 'active' : ''} 
                                data-type="subway">地铁</div>
                        </div>
                        <div className="region-content">
                            <div className="area-group-wrapper">
                            <ul className="area-group" onClick={this.selectAreaGroupHandler}>
                                {this.state.areaGroupFilters.map((item, i) =>
                                    <li className={this.state.currentAreaGroup.code === item.code ? 'active' : ''}
                                        key={item.code} data-index={i}>
                                        <span className="title">{item.title}</span>
                                        <span className="count">{(item.count > 0 ? `(${item.count})` : '')}</span>
                                    </li>
                                )}
                            </ul>
                            </div>
                            <div className="sub-area-wrapper">
                            <ul className="sub-area" onClick={this.selectSubAreaHandler}>
                                {this.state.subAreaFilters.map((item, i) =>
                                    <li className={(this.state.currentAreaGroup.code === this.state.filterData.areaCode && this.state.currentSubArea.code === item.code) ? 'active' : ''}
                                        key={item.code} data-index={i}>
                                        <span className="title">{item.title}</span>
                                        <span className="count">{item.count}</span>
                                    </li>
                                )}
                            </ul>
                            </div>
                        </div>
                    </div>,
                    this.props.containerDom
                )}
                {this.state.isSortSelectorShow && createPortal(
                    <ul className="sort-selector filter-panel" onClick={this.selectSortHandler}>
                        {this.props.data.sortTypeFilters.map((item, i) =>
                            <li className={this.state.currentSort.code === item.code ? 'active' : ''}
                                key={item.code} data-index={i}>{item.title}</li>
                        )}
                    </ul>,
                    this.props.containerDom
                )}
                {this.state.isSupportSelectorShow && createPortal(
                    <ul className="support-selector filter-panel" onClick={this.selectSuportHandler}>
                        <li key="-1" className={this.state.currentSupport.code ? '' : 'active'}>
                            <div className="title">不限</div>
                        </li>
                        {this.props.data.supportFilters.map((item, i) =>
                            <li key={item.code} 
                                className={this.state.currentSupport.code === item.code ? 'active' : ''}
                                data-index={i}>
                                <div className="title">{item.title}</div>
                            </li>)}
                    </ul>,
                    this.props.containerDom
                )}
                {this.state.isCinemaSearchShow && createPortal(
                    <div className="cinema-searh-wrapper">
                        <div className="cinema-search-header">
                            <div className="cinema-search-control">
                                <i className="icon-search"></i>
                                {this.state.searchKeyword && 
                                    <i className="icon-clear" onClick={this.clearKeywordHandler}></i>
                                }
                                <input 
                                    className="cinema-search-ipt" 
                                    placeholder="影院名称或地址"
                                    value={this.state.searchKeyword}
                                    onChange={this.searchIptChangeHandler} />
                            </div>
                            <button className="btn-cancel" onClick={this.searchHideHandler}>取消</button>
                        </div>
                        <div className="cinema-search-result">
                            {this.state.isSearchLoading &&
                                <div className="search-loading">加载中...</div>}
                            {this.state.isSearchFail &&
                                <div className="search-fail">亲,没有找到合适的影院...</div>}
                            <CinemaList data={this.state.searchResult} keyword={this.state.searchKeyword} />
                        </div>
                    </div>,
                    this.props.containerDom
                )}
                {(this.state.isRegionSelectorShow || this.state.isSortSelectorShow || this.state.isSupportSelectorShow) && createPortal(
                    <div className="mask"
                        onClick={this.hidePanelHandler}></div>,
                    this.props.containerDom
                )}
            </div>
        )
    }
}

export default CinemaFilter