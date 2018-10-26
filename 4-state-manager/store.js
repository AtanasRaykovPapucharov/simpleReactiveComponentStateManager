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