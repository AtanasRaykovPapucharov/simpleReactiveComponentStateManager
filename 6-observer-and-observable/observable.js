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