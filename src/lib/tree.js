import { v4 as uuidv4 } from 'uuid';
import convert from '@/utils/convert.js'

export class Node {
    constructor(tag = 'div', window = [], isFirst = false) {
        this.id = uuidv4()
        this.focus = false

        this.tag = tag
        this.window = window

        this.style = convert(window)

        if (isFirst) this.first = this.last = this
        else this.first = this.last = null

        this.children = this.next = this.previous = null
    }

    addBefore(node) {
        if (this.last) node.last = this.last
        if (this.last.first) this.last.first = node
        this.last = null
        node.previous = this.previous
        node.next = this
        if (this.previous) this.previous.next = node
        this.previous = node
    }

    addAfter(node) {
        if (this.first) node.first = this.first
        if (this.first.last) this.first.last = node
        this.first = null
        node.previous = this
        node.next = this.next
        if (this.next) this.next.previous = node
        this.next = node
    }

    remove() {
        // Si je supprime le premier element de la chain, il y a un poiteur last vers le noeud
        // if (this.last) this.next.last = this.last

        // Si je supprime le dernier element de la chain, il y a un poiteur first vers le noeud
        if (this.first) {
            this.previous.first = this.first
            this.first.last = this.previous
        }
        if (this.previous) this.previous.next = this.next
        if (this.next) this.next.previous = this.previous
    }

    get toArray() {
        if (this.next) {
            return [this].concat(this.next.toArray)
        }
        return [this]
    }

    static create(tag, opts, isFirst) {
        return new Node(tag, opts, isFirst)
    }
}
