const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

// create action
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'cake redux action',
    }
}

function buyIceCream() {
    return {
        type: BUY_ICECREAM,
        info: 'icecream redux action',
    }
}



// const intialState = {
//     numOfCakes: 10,
//     numOfIceCream: 20
// }
//
// const reducer = (state = intialState, action) => {
//     switch(action.type) {
//         case BUY_CAKE: return {
//             ... state,
//             numOfCakes: state.numOfCakes - 1
//         }

//         case BUY_ICECREAM: return {
//             ... state,
//             numOfIceCream: state.numOfIceCream - 1
//         }

//         default: return state
//     }
// }

// create intial states
const intialCakeState =  {
    numOfCakes: 10
}

const intialIceCreamState = {
    numOfIceCream: 20
}

// create reducer
const cake_Reducer = (state = intialCakeState, action) => {
    switch(action.type) {
        case BUY_CAKE: return {
            ... state,
            numOfCakes: state.numOfCakes - 1
        }

        default: return state
    }
}

const iceCream_Reducer = (state = intialIceCreamState, action) => {
    switch(action.type) {
        case BUY_ICECREAM: return {
            ... state,
            numOfIceCream: state.numOfIceCream - 1
        }

        default: return state
    }
}


// create store
const rootReducer = combineReducers({
    cake: cake_Reducer,
    iceCream: iceCream_Reducer
})
const store = createStore(rootReducer)
console.log('intial state', store.getState());
const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()




