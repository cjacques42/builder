<template>
  <div
    v-if="store.item"
    class="absolute shadow rounded border border-gray-200 bg-white w-[400px] top-[25px] right-[25px] p-3"
    @mousemove="onEvent"
    @mousedown="onEvent"
    @mouseup="onEvent"
  >
    <div class="mb-3">
      <div class="font-bold text-sm text-grey-900 mb-1">Tag</div>
      <input v-model="store.item.tag" type="text" class="px-1 bg-gray-200 rounded" />
    </div>

    <div class="font-bold text-sm text-grey-900 mb-1">Style</div>
    <div class="space-y-2">
      <div v-for="(style, index) in store.item.window" :key="style.property" class="flex">
        <input v-model="style.active" type="checkbox" :id="style.property" :name="style.property" class="mr-2" />
        <label :for="style.property" class="text-gray-500 select-none">{{ style.property }}: </label>
        <input v-model="style.value" type="text" class="flex-grow mx-2 px-1 bg-gray-200 rounded" />
        <button class="ml-auto font-bold" @click="remove(index)">-</button>
      </div>
    </div>

    <!-- properties -->
    <details class="mt-3">
      <summary>Click to see more</summary>
      <div class="space-y-1 max-h-[30vh] overflow-y-auto">
        <button
          v-for="(item, index) in properties" :key="index"
          class="px-2 bg-gray-100 rounded block w-full text-left"
          @click="add(item)"
        >
          {{ item }}
        </button>
      </div>
    </details>


    <form class="space-x-3 mt-3" @submit.prevent="add(ruleName)">
      <input v-model="ruleName" type="text" placeholder="margin" class="border rounded py-1 px-2" />
      <button type="submit" class="border rounded py-1 px-2">+</button>
    </form>
    <div class="flex mt-4">
      <button class="bg-gray-200 hover:bg-gray-300 text-gray-600 font-medium py-1 px-4 rounded shadow mx-auto" @click="store.item = null">Close</button>
    </div>
  </div>
</template>

<script>
import { store } from '@/store.js'
import convert from '@/utils/convert.js'
import properties from '@/const/properties.js'

export default {
  name: 'CoreWindow',
  data () {
    return { store, properties, ruleName: '' }
  },
  computed: {
  },
  watch: {
    "store.item.window": {
      handler(newItem) {
        if (newItem === null) return
        this.store.item.style = convert(this.store.item.window)
      },
      deep: true,
    }
  },
  methods: {
    onEvent(event) {
      event.stopPropagation()
    },
    add(property) {
      this.store.item.window.push({ property, active: false })
      this.reset()
    },
    reset() {
      this.ruleName = ''
    },
    remove(indexToRemove) {
      this.store.item.window = this.store.item.window.filter(
        (item, index) => !(index === indexToRemove)
      )
    },
  }
}
</script>
