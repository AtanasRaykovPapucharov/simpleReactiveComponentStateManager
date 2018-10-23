'use strict'

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

module.exports = observer