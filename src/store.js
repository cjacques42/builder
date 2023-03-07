import { reactive } from 'vue'

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
    this.item = this.index[id]
    return this.item
  },
  get() {
    return this.item
  },
  add(id, item) {
    this.index[item.id] = item
    add(id, this.tree, item)
  }
})
