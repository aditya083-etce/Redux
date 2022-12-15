const redux = require('redux')
const createStore = redux.createStore

// create action
const BUY_CAKE = 'BUY_CAKE'

function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'first redux action',
    }
}

// create reducer
const intialState = {
    numOfCakes: 10
}

const reducer = (state = intialState, action) => {
    switch(action.type) {
        case BUY_CAKE: return {
            ... state,
            numOfCakes: state.numOfCakes - 1
        }

        default: return state
    }
}

// create store
const store = createStore(reducer)
console.log('intial state', store.getState());
const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
unsubscribe()




