import { reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid';
import convert from '@/utils/convert.js'

function add(id, tree, item) {
    if (id === null) return tree.push(item)
    tree.forEach(element => {
        if (element.id === id) element.children.push(item)
        add(id, element.children, item)
    })
}

export const store = reactive({
  tree: [],
  index: {},
  item: null,
  open(id) {
    this.focus(false)
    this.item = this.index[id] || null
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
  add(id, item = null) {
    if (item === null) throw new Error(`item can't be null`)
    const node = {
      id: uuidv4(),
      tag: 'div',
      children: [],
      focus: false,
      style: convert(item?.window || {}),
      ...item,
    }
    this.index[node.id] = node
    add(id, this.tree, node)
  }
})
