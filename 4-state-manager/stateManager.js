'use strict'

const store = require('./store')

module.exports = {
    createStore(state) {
        return store(state)
    },
    createAction(type, func) {
        return {
            type: type,
            init: func
        }
    }
}