const wrapper = document.getElementsByClassName('wrapper')[0]
const stateInitial = {
    value: 5
}

let state = stateInitial

fetch('./component/component.html') // get html component
    .then(component => {
        return component.text() // return Promise
    })
    .then(component => {
        wrapper.innerHTML = `${component}` // append it to DOM element - wrapper
        return
    })
    .then(() => {
        _renderState(state) // this is initial state
    })
    .catch(error => {
        console.log('Error: ' + error)
    })

// render state value
function _renderState(state) {
    document.getElementById('number').innerHTML = state.value
}