<template>
  <div
    v-show="store.item"
    ref="window"
    class="absolute shadow overflow-hidden rounded bg-white w-[400px] top-[25px] right-[25px]"
  >
    <div ref="header" class="flex bg-indigo-200 px-2 py-1">
      <button class="hover:bg-gray-200 rounded-full p-0.5 mr-auto" @click="menu">
        <Icon :d="mdiMenu" class="h-5 w-5 text-gray-600 hover:text-gray-700" />
      </button>
      <button class="hover:bg-gray-200 rounded-full p-0.5" @click="minimize">
        <Icon :d="mdiMinus" class="h-5 w-5 text-gray-600 hover:text-gray-700" />
      </button>
      <button class="hover:bg-gray-200 rounded-full p-0.5" @click="store.close">
        <Icon :d="mdiWindowClose" class="h-5 w-5 text-gray-600 hover:text-gray-700" />
      </button>
    </div>
    <div v-if="store.item && isMinimized" class="p-3">
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
          <button class="ml-auto rounded-full" @click="remove(index)">
            <Icon :d="mdiDelete" class="h-4 w-4 text-gray-600 hover:text-gray-800" />
          </button>
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
  
      <form class="inline-flex mt-3" @submit.prevent="add(ruleName)">
        <input v-model="ruleName" type="text" placeholder="margin" class="appearance-none leading-tight focus:outline-none border-l border-y border-gray-400 rounded-l py-1 px-2" />
        <button type="submit" class="rounded-r bg-blue-500 hover:bg-blue-700 py-1.5 px-2">
          <Icon :d="mdiPlus" class="h-5 w-5 text-white" />
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { store } from '@/store.js'
import Icon from '@/components/Icon.vue'
import convert from '@/utils/convert.js'
import drag from '@/utils/drag.js'
import properties from '@/const/properties.js'
import { mdiMenu, mdiMinus, mdiWindowClose, mdiPlus, mdiDelete } from '@mdi/js';

export default {
  name: 'CoreWindow',
  data () {
    return {
      menuIsClosed: true,
      isMinimized: false,
      store,
      properties,
      ruleName: '',
      mdiMenu,
      mdiMinus,
      mdiWindowClose,
      mdiPlus,
      mdiDelete,
    }
  },
  components: {
    Icon
  },
  mounted () {
    drag(this.$refs.window, this.$refs.header)
  },
  computed: {
  },
  watch: {
    "store.item.window": {
      handler() {
        if (this.store.item === null) return
        this.store.item.style = convert(this.store.item.window)
      },
      deep: true,
    }
  },
  methods: {
    menu() {
      this.menuIsClosed = false
    },
    minimize() {
      this.isMinimized = !this.isMinimized
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
