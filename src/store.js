import { reactive } from 'vue'
import { Node } from '@/lib/tree.js'

export const store = reactive({
  tree: null,
  map: new Map(),
  item: null,
  duplicate(id, recursive = false) {
    console.log(id, recursive)
  },
  remove(id) {
    const current = this.map.get(id)
    current.remove()
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
    const add = (tree, node) => {
      if (tree) {
        tree.last.addAfter(node)
        return tree
      }
      return node
    }
    const current = this.map.get(id)
    const node = Node.create('div', window, this.tree === null || current?.children === null)
    this.map.set(node.id, node)

    if (id) {
      current.children = add(current.children, node)
    } else {
      this.tree = add(this.tree, node)
    }
    console.log(id)
    console.log(this.tree)
  }
})
