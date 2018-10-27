# simple JS reactive component state manager

The **StateManager** is just a factory. It creates stores and actions:

```
interface IStateManager {
    createStore(state: object): IStore
    createAction(type: string, func: object): IAction
}
```

And it's implementation:

```
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
```

## The click **event listener** - 1) handles event and dispatch it to the store:

```
wrapper.addEventListener('click', event => {
    const target = event.target.id
    store.dispatch(action[target])
})
```

## 2) **reducer** change the state in response of the action

```
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
```

## 3) The state is changed and a store **subscribe** updates the view

``` 
store.subscribe(() => {
    _renderState(state)
})
```
