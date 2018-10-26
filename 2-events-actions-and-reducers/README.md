# simple JS reactive component state manager

## The click **event listener** - 1) handles event, 2) change the state and 3) update the view - (3 in 1):

```
wrapper.addEventListener('click', event => {
    const target = event.target

    switch (target.id) {
        case 'up':
            state.value += 1
            _renderState(state)
            break
        case 'down':
            state.value -= 1
            _renderState(state)
            break
    }
})
```