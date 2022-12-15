const redux = require('redux')
const createStore = redux.createStore

const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

// intial state
const intialState = {
    loading: false,
    users : [],
    error: ''
}

// actions
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// action creaters
const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

// create reducers
const reducer = (state = intialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUEST: return {
            ...state,
            loading: true
        }

        case FETCH_USERS_SUCCESS: return {
            ...state,
            loading: false,
            users: action.payload,
            error: ''
        }
        
        case FETCH_USERS_FAILURE: return {
            ...state,
            loading: false,
            users: [],
            error: action.payload,
        }

        default:
            return state
    }
}

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users', 
            {headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        }).then(response => {
            const users = response.data.map(user => ({
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email
            }))
            dispatch(fetchUsersSuccess(users))
        }).catch(error => {
            dispatch(fetchUsersFailure(error.message))
        })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())

