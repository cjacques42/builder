import { v4 as uuidv4 } from 'uuid';
import convert from '@/utils/convert.js'

export class Node {
    constructor(tag = 'div', window = []) {
        this.id = uuidv4()
        this.focus = false

        this.tag = tag
        this.window = window

        this.style = convert(window)

        this.children = null
        this.children = this.next = this.previous = null
    }

    addBefore(node) {
        node.previous = this.previous
        node.next = this
        if (this.previous) this.previous.next = node
        this.previous = node
    }

    addAfter(node) {
        node.previous = this
        node.next = this.next
        if (this.next) this.next.previous = node
        this.next = node
    }

    get toArray() {
        if (this.next) {
            return [this].concat(this.next.toArray)
        }
        return [this]
    }

    remove() {
        this.previous.next = this.next
        this.next.previous = this.previous
    }

    static create(opts) {
        return new Node(opts)
    }
}
