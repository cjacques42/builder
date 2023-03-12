import { reactive } from 'vue'
import { Adapter, Node } from '@/lib/tree.js'

export const store = reactive({
  tree: Adapter.create(),
  map: new Map(),
  item: null,
  duplicate(id, recursive = false) {
    console.log(id, recursive)
    const current = this.map.get(id)
    const newNode = current.clone()
    this.map.set(newNode.id, newNode)
    current.addAfter(newNode)
  },
  remove(id) {
    const current = this.map.get(id)
    current.remove()
    this.close()
  },
  open(id) {
    this.focus(false)
    this.item = this.map.get(id) || null
    if (this.item === null) throw new Error(`item can't be null`)
    this.focus()
    return this.item
  },
  focus(value = true) {
    if (this.item) this.item.focus = value
  },
  close() {
    this.focus(false)
    this.item = null
  },
  get() {
    return this.item
  },
  add(id, window) {
    const node = Node.create({ tag: 'div', window })
    this.map.set(node.id, node)

    // Current parent Node
    const current = this.map.get(id)
    if (current) {
      current.children.parent = parent
      current.children.push(node)
    } else {
      this.tree.push(node)
    }
  }
})
