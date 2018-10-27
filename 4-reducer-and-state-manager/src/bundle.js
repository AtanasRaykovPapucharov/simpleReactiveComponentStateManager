(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const wrapper = document.getElementsByClassName('wrapper')[0]
const stateInitial = {
    value: 5
}

let state = stateInitial

const stateManager = require('../../stateManager')


// state change messenger
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

// get html component and append it to DOM element - wrapper
fetch('./component/component.html')
    .then(component => {
        return component.text()
    })
    .then(component => {
        wrapper.innerHTML = `${component}`
        _renderState(state)
    })
    .catch(error => {
        console.log('Error: ' + error)
    })

// component click event watcher
wrapper.addEventListener('click', event => {
    const target = event.target.id
    store.dispatch(action[target])
})


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
},{"../../stateManager":2}],2:[function(require,module,exports){
'use strict'

const store = require('./store')

const stateManager = {
    createStore(state, reducer) {
        return store(state, reducer)
    },
    createAction(type, func) {
        return {
            type: type,
            payload: func
        }
    }
}

module.exports = stateManager
},{"./store":3}],3:[function(require,module,exports){
'use strict'

const store = (state, reducer) => {
    let currentState = state || {}
    const subscribes = []

    return {
        subscribe(func) {
            subscribes.push(func)
        },
        dispatch(action) {
            try {
                const newState = reducer(currentState, action)

                subscribes.forEach(func => {
                    func(newState)
                })

                currentState = newState
            } catch(err) {
                throw new Error(`ERROR: No reducer!, ${err}`)
            }
        },
        getState() {
            return currentState
        }
    }
}

module.exports = store
},{}]},{},[1]);
