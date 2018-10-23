'use strict'

const store = state => {
    let currentState = state || {}
    const subscribes = []
    const change = (state, action) => {
        if (action) {
            return action.init(state)
        }
    }
    return {
        subscribe(func) {
            subscribes.push(func)
        },
        dispatch(action) {
            const newState = change(currentState, action)
            subscribes.forEach(func => {
                func(newState)
            })
            currentState = newState
        },
        getState() {
            return currentState
        }
    }
}

module.exports = store