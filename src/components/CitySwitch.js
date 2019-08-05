import React, { PureComponent, Fragment, createRef } from 'react'
import { createPortal } from 'react-dom'
import './CitySwitch.css'

class CitySwitch extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isCitySelectorShow: false,
        }
        this.citySelectorRef = createRef()
    }

    componentDidUpdate(prevProps) {
        if (!this.props.currentCity.id && !this.state.isCitySelectorShow) {
            this.handleCitySelectShow()
            console.log('handleCitySelectShow')
        } else if (!prevProps.currentCity.id && this.props.currentCity.id && this.state.isCitySelectorShow) {
            this.handleCitySelectClose()
            console.log('handleCitySelectClose')
        }
    }

    handleCitySelectClose = () => {
        this.setState({ isCitySelectorShow: false })
        setTimeout(() => {
            this.citySelectorRef.current.setAttribute('style', 'display:none;')
        }, 200)
    }

    handleCitySelectShow = () => {
        this.citySelectorRef.current.setAttribute('style', 'display:block;')
        this.setState({ isCitySelectorShow: true })
    }

    handleCitySelect(name, id) {
        if (!id) return
        if (this.props.onSelectCity) {
            this.props.onSelectCity({
                name,
                id
            })
        }

        this.handleCitySelectClose()
    }

    render() {
        return (
            <Fragment>
                <div className="current-city" onClick={this.handleCitySelectShow}>
                    <div className="city-name">
                        {this.props.currentCity.name}
                    </div>
                    <div className="arrow-down"></div>
                </div>
                {createPortal(
                    <div ref={this.citySelectorRef}
                    className={'city-selector' + (this.state.isCitySelectorShow ? ' top-in' : '')}>
                    <div className="city-list-title">
                        选择城市
                        <div className="btn-close" role="button" aria-label="关闭"
                            onClick={this.handleCitySelectClose}>✕</div>
                    </div>
                    <div className="city-list">
                        <div className="city-group" id="currentCity">
                            <h3>当前</h3>
                            <ul>
                                <li className="city-item"
                                    onClick={this.handleCitySelect.bind(this, this.props.currentCity.name, this.props.currentCity.id)}>
                                    {this.props.currentCity.name}
                                </li>
                            </ul>
                        </div>
                        {
                            this.props.gpsCity &&
                            <div className="city-group" id="gpsCity">
                                <h3>GPS</h3>
                                <ul>
                                    <li className="city-item"
                                        onClick={this.handleCitySelect.bind(this, this.props.gpsCity.name, this.props.gpsCity.id)}>
                                        {this.props.gpsCity.name}
                                    </li>
                                </ul>
                            </div>
                        }
                        {
                            Object.keys(this.props.cityList).map(groupName => {
                                let group = this.props.cityList[groupName]
                                return (
                                    <div key={groupName} className="city-group" id={groupName}>
                                        <h3>{groupName}</h3>
                                        <ul>
                                            {group.map(city =>
                                                <li key={city.cityCode}
                                                    className="city-item"
                                                    onClick={this.handleCitySelect.bind(this, city.regionName, city.cityCode)}>
                                                    {city.regionName}
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <ul className={'city-index' + (this.state.isCitySelectorShow ? ' left-in' : '')}>
                        <li key="当前"><a href="#currentCity">当前</a></li>
                        <li key="GPS"><a href="#gpsCity">GPS</a></li>
                        {Object.keys(this.props.cityList).map(groupName => <li key={groupName}><a href={'#' + groupName}>{groupName}</a></li>)}
                    </ul>
                </div>,
                this.props.containerDom
                )}
            </Fragment>
        )
    }
}

export default CitySwitch