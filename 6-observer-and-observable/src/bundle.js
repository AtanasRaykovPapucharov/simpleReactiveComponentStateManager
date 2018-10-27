(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict'

const observer = require('./observer')

const hotObservable = obj => {
    const collection = obj || {}

    return {
        subscribe(func) {
            const handle = handle => {
                handle.next(collection)
                handle.complete()
            }

            const sub = {
                next: func,
                error: err => {
                    console.log(err)
                },
                complete: () => {
                    console.log('completed!')
                }
            }
            const subscriber = observer(sub)
            subscriber.unsubscribe = handle(subscriber)

            return {
                unsubscribe: () => {
                    subscriber.unsubscribe()
                },
                publish: () => {
                    return
                }
            }
        }
    }
}

//======================================================

const coldObservable = obj => {
    const collection = obj || {}
    const handle = handle => {
        handle.next(collection)
        handle.complete()
    }

    return {
        subscribe(func) {
            const sub = {
                next: func,
                error: err => {
                    console.log(err)
                },
                complete: () => {
                    console.log('completed!')
                }
            }
            const subscriber = observer(sub)

            return {
                unsubscribe: () => {
                    subscriber.unsubscribe()
                },
                publish: () => {
                    subscriber.unsubscribe = handle(subscriber)
                }
            }
        }
    }
}

//=========================================================

const hotArrayObservable = obj => {
    const collection = obj || {}
    const handle = handle => {
        collection.forEach(element => {
            handle.next(element)
        })

        handle.complete()
    }

    return {
        subscribe(func) {
            const sub = {
                next: func,
                error: err => {
                    console.log(err)
                },
                complete: () => {
                    console.log('completed!')
                }
            }
            const subscriber = observer(sub)
            subscriber.unsubscribe = handle(subscriber)

            return {
                unsubscribe: () => {
                    subscriber.unsubscribe()
                },
                publish: () => {
                    return
                }
            }
        }
    }
}

//=========================================================

const coldArrayObservable = obj => {
    const collection = obj || {}
    const handle = handle => {
        collection.forEach(element => {
            handle.next(element)
        })

        handle.complete()
    }

    return {
        subscribe(func) {
            const sub = {
                next: func,
                error: err => {
                    console.log(err)
                },
                complete: () => {
                    console.log('completed!')
                }
            }
            const subscriber = observer(sub)

            return {
                unsubscribe: () => {
                    subscriber.unsubscribe()
                },
                publish: () => {
                    subscriber.unsubscribe = handle(subscriber)
                }
            }
        }
    }
}

//=========================================================

const eventObservableHot = (target, event) => {
    const handle = handle => {
        return target.addEventListener(event, e => {
            handle.next(e)
            handle.complete()
        })
    }

    return {
        subscribe(func) {
            const subscriber = observer({
                next: func
            })
            subscriber.unsubscribe = handle(subscriber)

            return {
                unsubscribe: () => {
                    subscriber.unsubscribe()
                }
            }
        }
    }
}

//=========================================================

const eventObservableCold = (target, event) => {
    const handle = handle => {
        return target.addEventListener(event, e => {
            handle.next(e)
            handle.complete()
        })
    }

    return {
        subscribe(func) {
            const subscriber = observer({
                next: func
            })

            return {
                unsubscribe: () => {
                    subscriber.unsubscribe()
                },
                publish: () => {
                    subscriber.unsubscribe = handle(subscriber)
                }
            }
        }
    }
}

//========================================================

module.exports = {
    hot: hotObservable,
    cold: coldObservable,
    hotFromEvent: eventObservableHot,
    coldFromEvent: eventObservableCold,
    hotFromArray: hotArrayObservable,
    coldFromArray: coldArrayObservable,
}
},{"./observer":2}],2:[function(require,module,exports){
'use strict'

const observer = handleEvent => {
    handleEvent = handleEvent || {}
    let isUnsubscribed = false

    return {
        next(value) {
            if (handleEvent.next && !isUnsubscribed) {
                handleEvent.next(value)
            }

            return this
        },
        error(error) {
            if (!isUnsubscribed) {
                if (handleEvent.error) {
                    handleEvent.error(error)
                }

                this.unsubscribe
            }
        },
        complete() {
            if (!isUnsubscribed) {
                if (handleEvent.complete) {
                    handleEvent.complete()
                }

                this.unsubscribe
            }
        },
        unsubscribe() {
            isUnsubscribed = true
        }
    }
}

module.exports = observer
},{}],3:[function(require,module,exports){
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


//===========================================================
// reactive event listener
const fromEvent = require('../../observable').hotFromEvent

fromEvent(document, 'click')
    .subscribe(event => {
        const act = action[event.target.id]
        store.dispatch(act)
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
},{"../../observable":1,"../../stateManager":4}],4:[function(require,module,exports){
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
},{"./store":5}],5:[function(require,module,exports){
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
},{}]},{},[3]);
