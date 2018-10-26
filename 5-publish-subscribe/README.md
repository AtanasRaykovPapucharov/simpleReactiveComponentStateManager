# simple JS reactive component state manager

!['Publish/subscribe'](pub-sub.png)

[HERE](https://github.com/ajhalthor/pubsub-application) is a very good practicle examaple of this pattern. This is the implementation object:
```
const event = {
    events: {},
    on: function (eventName, fn) {
        this.events[eventName] = this.events[eventName] || []
        this.events[eventName].push(fn)
    },
    off: function (eventName, fn) {
        if (this.events[eventName]) {
            for (let i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === fn) {
                    this.events[eventName].splice(i, 1)
                    break
                }
            }
        }
    },
    trigger: function (eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(fn => {
                fn(data)
            })
        }
    }
}
```
