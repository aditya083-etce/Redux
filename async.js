const redux = require('redux');
const createStore = redux.createStore;

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

const store = createStore(reducer);
store.subscribe(() => {});
store.dispatch(fetchUsersRequest());
store.dispatch(fetchUsersSuccess());
store.dispatch(fetchUsersFailure());
