import {capitalize} from "./utils";

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error(`No $root provided for DomListener!`)
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDomListener() {
        console.log(this.listeners, this.$root)
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                const name = this.name || ''
                throw new Error(
                    `Method ${method} is not implemented in ${name} Component`
                )
            }
            this[method] = this[method].bind(this)
            console.log(method)
            console.log(listener)
            console.log(this[method])
            console.log(this)

            this.$root.on(listener, this[method])
        })
    }

    removeDomListener() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)

            this.$root.remove(listener, this[method])
        })
    }
}

function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}