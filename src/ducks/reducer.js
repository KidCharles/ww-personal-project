
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
    gear_name: '',
    gear_price: '',
    gear_img: '',
    gear_long_desc: '',
    gear_short_desc: ''
}

// 2.) CONST VARIABLES
const ADD_TRIP = 'ADD_TRIP';
const GET_USER_DATA = 'GET_USER_DATA';




// 3.) REDUCER FUNCTION

export default function reducer(state = initial_state, action) {
    switch (action.type) {
        case ADD_TRIP:
            return Object.assign({}, state, { trips: action.paylod })
        case GET_USER_DATA + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload })
        default:
            return state;
    }
}

// 4.) ACTION CREATORS

export function addTrip(trip) {
    return {
        type: ADD_TRIP,
        payload: trip
    }
}

export function getUser() {
    let userData = axios.get('/auth/user').then(res => res.data);
    return {
        type: GET_USER_DATA,
        payload: userData
    }
}
