# simple JS reactive component state manager

The **Store** is object that keep the **state**. It has 3 methods as we see in the TS IStore interface down:

```
interface IStore {
    subscribe(func: object): void
    dispatch(action: IAction): void
    getState(): object
}
```

And its implementation:
```
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
```
The **action** that change state looks like:

```
interface IAction {
    type: string
    payload: object
}
```
