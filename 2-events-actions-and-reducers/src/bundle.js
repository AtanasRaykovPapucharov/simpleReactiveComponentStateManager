(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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


// render state value
function _renderState(state) {
    document.getElementById('number').innerHTML = state.value
}
},{}]},{},[1]);
