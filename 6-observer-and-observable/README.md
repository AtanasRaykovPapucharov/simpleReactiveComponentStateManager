# simple JS reactive component state manager
```
interface IObserver {
    next(value)
    error(err)
    complete()
    unsubscribe()
}
```

```
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
```

```
interface IObservable {
    subscribe(func)
}
```

## Before observable wrapper:
```
// dispatch action
wrapper.addEventListener('click', event => {
    const target = event.target.id
    store.dispatch(action[target])
})

// update view
store.subscribe(() => {
    _renderState(state)
})
```

## After observable wrapper:
```
// dispatch action
fromEvent(document, 'click')
    .subscribe(event => {
        const act = action[event.target.id]
        store.dispatch(act)
    })

// update view
store
    .subscribe(() => {
        _renderState(state)
    })
```

As we see the code has better consistency.