import { v4 as uuidv4 } from 'uuid';
import convert from '@/utils/convert.js'

export class Adapter {
    constructor(parent = null, node = null) {
        this.parent = parent
        this.first = node
        this.last = node
    }

    push(node) {
        node.parent = this
        if (this.size) {
            this.last.addAfter(node)
        } else {
            this.first = this.last = node
        }
    }

    get children() {
        return this.first?.toArray || []
    }

    get size() {
        return this.children.length
    }

    static create(parent, node) {
        return new Adapter(parent, node)
    }
}

export class Node {
    constructor(opts) {
        const configuration = Object.assign(this, {
            id: uuidv4(),
            tag: 'div',
            focus: false,
            parent: null,
            window: [],
            children: Adapter.create(this),
        }, opts)

        this.id = configuration.id
        this.tag = configuration.tag
        this.focus = configuration.focus
        this.parent = configuration.parent
        this.window = configuration.window
        this.children = configuration.children

        this.next = this.previous = null
    }

    addBefore(node) {
        node.previous = this.previous
        node.next = this
        if (this.previous) {
            this.previous.next = node
        } else {
            // Adapter access
            this.parent.first = node
        }
        this.previous = node
    }
    
    addAfter(node) {
        node.previous = this
        node.next = this.next
        if (this.next) {
            this.next.previous = node
        } else {
            // Adapter access
            this.parent.last = node
        }
        this.next = node
    }

    remove() {
        if (this.parent.size === 1) this.parent.first = this.parent.last = null
        if (this.previous) this.previous.next = this.next
        if (this.next) this.next.previous = this.previous
    }

    get style() {
        return convert(this.window)
    }

    get toArray() {
        if (this.next) {
            return [this].concat(this.next.toArray)
        }
        return [this]
    }

    static create(opts) {
        return new Node(opts)
    }
}
