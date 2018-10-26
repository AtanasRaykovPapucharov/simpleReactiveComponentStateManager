# simple JavaScript reactive component state manager with no outer dependencies

## **setup**

For this example my modules import/export is [nodejs](https://nodejs.org/) style, for bundler I use [browserify](http://browserify.org/) so:
- init package.json: **npm init -y** 
- install browserify as a development dependency: 
 **npm i -D browserify**
 - in *package.json* set bundle-js and start scripts:

 ```
 "scripts": {
    "js": "browserify ./src/component/component.js -o ./src/bundle.js",
    "start": "cd src && live-server"
  }
 ```
 
## **component**
 - set files and directories:

```
src
|
\_component
| |
| \_component.html
| |
| \_component.js
|
\_bundele.js
|
\_index.html
|
\_style.css
```

- get html component and append it to DOM element - wrapper

```
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
```

## state

- component state is an object contains component variables
```
const initialState = {
    value: 5
}

let state = initialState
```

```
function _renderState(state) {
    document.getElementById('number').innerHTML = state.value
}
```
