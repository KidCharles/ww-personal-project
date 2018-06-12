// 1.) INITIAL STATE

const initial_state = {
    username: '',
    userId: 0,
    product_name: '',
    product_price: 0,
    product_img: '',
    product_description: '',
    trips:[],
    trip_name:'',
    trip_img:'',
    trip_long_desc:'',
    trip_short_desc:'',
    trip_price:0,
    trip_color:'',
    gear:[],
    gear_name:'',
    gear_price:'',
    gear_img:'',
    gear_long_desc:'',
    gear_short_desc:''
}

// 2.) CONST VARIABLES

// const UPDATE_USER_INFO = 'UPDATE_USER_INFO';

// 3.) REDUCER FUNCTION

export default function reducer(state = initial_state, action) {
    switch (action.type) {
        default:
            return state;
    }
}

// 4.) ACTION CREATORS

// export function addUser(user) {
//     return {
//         type: UPDATE_USER_INFO,
//         payload: user
//     }
// }
