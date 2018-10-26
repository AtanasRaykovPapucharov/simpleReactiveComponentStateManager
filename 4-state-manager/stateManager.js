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