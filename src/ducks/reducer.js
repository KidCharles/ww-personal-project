
import axios from 'axios';

// 1.) INITIAL STATE

const initial_state = {
    user: {},
    // username: '',
    // userId: 0,
    // product_name: '',
    // product_price: 0,
    // product_img: '',
    // product_description: '',
    trips: [],
    // trip_name: '',
    // trip_img: '',
    // trip_long_desc: '',
    // trip_short_desc: '',
    // trip_price: 0,
    // trip_color: '',
    gear: [],
    // gear_name: '',
    // gear_price: '',
    // gear_img: '',
    // gear_long_desc: '',
    // gear_short_desc: ''
}

// 2.) CONST VARIABLES
const ADD_TRIP = 'ADD_TRIP';
const GET_USER_DATA = 'GET_USER_DATA';
const GET_TRIPS = 'GET_TRIPS';
const DELETE_TRIP = 'DELETE_TRIP';
const GET_GEAR = 'GET_GEAR';
const ADD_GEAR = 'ADD_GEAR';
const DELETE_GEAR = 'DELETE_GEAR';





// 3.) REDUCER FUNCTION

export default function reducer(state = initial_state, action) {
    switch (action.type) {
        case ADD_TRIP:
            return Object.assign({}, state, { trips: action.payload })
        case GET_TRIPS:
            return Object.assign({}, state, { trips: action.payload })
        case DELETE_TRIP + '_FULFILLED':
            return Object.assign({}, state, { trips: action.payload })
        case GET_GEAR:
            return Object.assign({}, state, { gear: action.payload })
        case ADD_GEAR:
            return Object.assign({}, state, { gear: action.payload })
        case DELETE_GEAR + '_FULFILLED':
            return Object.assign({}, state, { gear: action.payload })
        default:
            return state;
    }
}

// 4.) ACTION CREATORS

// export function getUser() {
//     //this endpoint is in the index
//     let userData = axios.get('/auth/user').then(res => res.data);
//     console.log('OVER 9000!')        
//     return {
//         type: GET_USER_DATA,
//         payload: userData
//     }
// }

export function addTrip(trip) {
    return {
        type: ADD_TRIP,
        payload: trip
    }
}

export function getTrips(trips) {
    return {
        type: GET_TRIPS,
        payload: trips
    }
}

export function deleteTrip(id) {
    let trip = axios.delete(`/api/deleteTrip/${id}`).then(res => res.data)
    return {
        type: DELETE_TRIP,
        payload: trip
    }
}

export function getGear(gear) {
    return {
        type: GET_GEAR,
        payload: gear
    }
}

export function addGear(gear) {
    return {
        type: ADD_GEAR,
        payload: gear
    }
}

export function deleteGear(id) {
    let gear = axios.delete(`/api/deleteGear/${id}`).then(res => res.data)
    return {
        type: DELETE_GEAR,
        payload: gear
    }
}