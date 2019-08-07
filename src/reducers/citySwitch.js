/* @flow */

const SELECT_CITY = 'SELECT_CITY'
const SET_GPS = 'SET_GPS'

type stateType = {
    currentCity?: { name: string, id: string },
    gpsCity?: { name: string, id: string }
}

type actionType = {
    type: string,
    currentCity?: { name: string, id: string },
    gpsCity?: { name: string, id: string }
}

export default function (state?: stateType, action: actionType) {
    if (!state) {
        state = {
            currentCity: {
                name: '请选择',
                id: ''
            },
            gpsCity: {
                name: '获取中...',
                id: ''
            }
        }
    }

    switch (action.type) {
        case SELECT_CITY:
            return {
                ...state,
                currentCity: action.currentCity
            }
        case SET_GPS:
            return {
                ...state,
                gpsCity: action.gpsCity
            }
        default:
            return state
    }
}

export const selectCity = (city: {name: string, id: string}) => {
    return {
        type: SELECT_CITY,
        currentCity: city
    }
}

export const setGPS = (city: {name: string, id: string}) => {
    return {
        type: SET_GPS,
        gpsCity: city
    }
}