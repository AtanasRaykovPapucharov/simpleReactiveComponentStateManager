const wrapper = document.getElementsByClassName('wrapper')[0]
const stateInitial = {
    value: 5
}

let state = stateInitial

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
// component click event listener
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
//===========================================================


// render state value
function _renderState(state) {
    document.getElementById('number').innerHTML = state.value
}