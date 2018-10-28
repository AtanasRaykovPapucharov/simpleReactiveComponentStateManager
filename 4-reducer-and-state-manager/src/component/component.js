const wrapper = document.getElementsByClassName('wrapper')[0]
const stateInitial = {
    value: 5
}

let state = stateInitial

const stateManager = require('../../stateManager')


// state changes messenger
const action = {
    up: stateManager.createAction('INCREASE', _increaseValue),
    down: stateManager.createAction('DECREASE', _decreaseValue)
}

// change the state in response of the action
const reducer = (state = state, action) => {
    switch (action.type) {
        case 'INCREASE':
            state.value += 1
            break
        case 'DECREASE':
            state.value -= 1
            break
    }

    return state
}

const store = stateManager.createStore(state, reducer)

// update view after state change
store.subscribe(() => {
    _renderState(state)
})


fetch('./component/component.html') // get html component
    .then(component => {
        return component.text() // return Promise
    })
    .then(component => {
        wrapper.innerHTML = `${component}` // append it to DOM element - wrapper
        return
    })
    .then(() => {
        _renderState(state) // this is initial state
    })
    .catch(error => {
        console.log('Error: ' + error)
    })


//===========================================================
// component click event listener
wrapper.addEventListener('click', event => {
    const target = event.target.id
    store.dispatch(action[target])
})
//===========================================================


// render state value
function _renderState(state) {
    document.getElementById('number').innerHTML = state.value
}

// action payloads
function _increaseValue(state) {
    state.value += 1
    return state
}

function _decreaseValue(state) {
    state.value -= 1
    return state
}