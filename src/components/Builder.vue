<template>
  <div :class="{ 'select-none': this.create }" style="padding-bottom: 50px">
    <Rendering :tree="store.tree" />
  </div>
</template>

<script>
import Rendering from '@/components/Rendering.vue'
import { store } from '@/store.js'

export default {
  name: 'CoreBuilder',
  components: {
    Rendering
  },
  props: {
    // msg: String
  },
  data () {
    return {
      cursor: { clientX: 0, clientY: 0 },
      create: null,
      store,
    }
  },
  mounted () {
    document.body.addEventListener("mousemove", event => this.store.item === null && this.onMouseMove(event));
    document.body.addEventListener("mousedown", event => this.store.item === null && this.onMouseDown(event));
    document.body.addEventListener("mouseup", event => this.store.item === null && this.onMouseUp(event));
  },
  methods: {
    onMouseMove(event) {
      const { clientX, clientY } = event
      this.cursor = { clientX, clientY }
      if (this.create) {
        this.create.moved = true
        return
      }

      const id = event.target.id || null
      if (id === null) return
    },
    onMouseDown(event) {
      if (event.which !== 1) return;
      const { clientX, clientY } = event
      this.cursor = { clientX, clientY }
      this.create = { from: this.cursor, to: null, event, moved: false }
    },
    onMouseUp(event) {
      if (this.create === null) return
      if (event.which !== 1) return; 
      const id = this.create.event.target.id || null
      console.log('-- id', id)
      if (this.create.moved === false && id) {
        store.open(id)
        this.finished()
        return
      }
      const { clientX, clientY } = event
      this.cursor = { clientX, clientY }
      this.create.to = this.cursor

      const { from, to } = this.create
      const width = `${to.clientX - from.clientX}px`
      const height = `${to.clientY - from.clientY}px`
      const window = [
        { property: 'backgroundColor', value: 'crimson', active: true },
        { property: 'color', value: 'white', active: true },
        { property: 'width', value: width, active: true },
        { property: 'height', value: height, active: true },
      ]
      store.add(id, window)
      this.finished()
    },
    finished() {
      this.create = null
    }
  }
}
</script>
