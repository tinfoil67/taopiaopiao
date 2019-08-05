import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectCity, setGPS } from '../reducers/taopiaopiao'
import CitySwitch from '../components/CitySwitch'

// import cityListData from '../mockData/cityList.json'
import { data } from '../mockData/allRegion.json'
const { returnValue: cityListData } = data

const AMAP_KEY = 'abeeb921e530228e3a0fbe03e7856ab0'

class CitySwitchContainer extends Component {
    componentDidMount() {
        this._loadCurrentCity()
        this._getGPSPosition()
    }

    _loadCurrentCity = () => {
        let currentCity = localStorage.getItem('currentCity') || '{}'
        try {
            currentCity = JSON.parse(currentCity)
            if (currentCity.id) {
                this.props.onSelect(currentCity)
            }
        } catch (e) {
            console.log(e)
        }
    }

    _getGPSPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._getGPSCity.bind(this))
        } else {
            if (this.props.onSetGPS) {
                this.props.onSetGPS({
                    name: '无 GPS 权限',
                    id: ''
                })
            }
        }
    }

    _getGPSCity(position) {
        const longitude = Number(position.coords.longitude).toFixed(6)
        const latitude = Number(position.coords.latitude).toFixed(6)
        fetch(`https://restapi.amap.com/v3/geocode/regeo?key=${AMAP_KEY}&location=${longitude},${latitude}`)
            .then(res => res.json())
            .then(
                (result) => {
                    const address = result.regeocode.addressComponent
                    if (address && this.props.onSetGPS) {
                        this.props.onSetGPS({
                            name: address.city.replace('市', ''),
                            id: address.adcode
                        })
                    }
                },
                (error) => {
                    if (this.props.onSetGPS) {
                        this.props.onSetGPS({
                            name: '无法获取 GPS 信息',
                            id: ''
                        })
                    }
                    console.log(error)
                }
            )
    }

    handleSelectCity = (city) => {
        if (this.props.onSelect) {
            this.props.onSelect(city)
        }
        localStorage.setItem('currentCity', JSON.stringify(city))
    }

    _getContainer(){
        return document.getElementById('root')
    }

    render() {
        return (
            <CitySwitch
                currentCity={this.props.currentCity}
                gpsCity={this.props.gpsCity}
                cityList={cityListData}
                onSelectCity={this.handleSelectCity}
                containerDom={this._getContainer()} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentCity: state.currentCity,
        gpsCity: state.gpsCity
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelect: (city) => {
            dispatch(selectCity(city))
        },
        onSetGPS: (city) => {
            dispatch(setGPS(city))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CitySwitchContainer)