<template>
  <vue-resizable
    v-show="store.item"
    ref="window"
    class="!absolute shadow rounded bg-white flex flex-col"
    :width="400"
    height="auto"
    :min-width="400"
    :active="active"
    drag-selector=".header"
  >
    <div class="header flex bg-indigo-200 px-2 py-1 rounded-t">
      <Dropdown :items="menu">
        <template #default>
          <MenuButton
            class="inline-block hover:bg-gray-200 rounded-full p-0.5 focus:outline-none"
          >
            <Icon :d="mdiMenu" class="h-5 w-5 text-gray-600 hover:text-gray-700" />
          </MenuButton>
        </template>
      </Dropdown>
      <button class="inline-block hover:bg-gray-200 rounded-full p-0.5 ml-auto" @click="minimize">
        <Icon :d="mdiMinus" class="h-5 w-5 text-gray-600 hover:text-gray-700" />
      </button>
      <button class="inline-block hover:bg-gray-200 rounded-full p-0.5" @click="store.close">
        <Icon :d="mdiWindowClose" class="h-5 w-5 text-gray-600 hover:text-red-700" />
      </button>
    </div>
    <div v-if="isOpened" class="p-3 overflow-y-auto">
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
      <details class="mt-3 border rounded">
        <summary class="px-2">Click to see more</summary>
        <div class="space-y-1 max-h-[30vh] px-2 overflow-y-auto">
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
  </vue-resizable>
</template>

<script>
import VueResizable from 'vue-resizable'
import { store } from '@/store.js'
import Icon from '@/components/Icon.vue'
import Dropdown from '@/components/Dropdown.vue'
import convert from '@/utils/convert.js'
import properties from '@/const/properties.js'
import { mdiMenu, mdiMinus, mdiWindowClose, mdiPlus, mdiDelete } from '@mdi/js';
import { MenuButton } from '@headlessui/vue'

export default {
  name: 'CoreWindow',
  data () {
    return {
      menu: [
        { name: 'Duplicate', click: () => store.duplicate(store.item.id, false) },
        { name: 'Duplicate recusively', click: () => store.duplicate(store.item.id, true) },
        { name: 'Remove', click: () => store.remove(store.item.id) },
      ],
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
    Icon,
    Dropdown,
    MenuButton,
    VueResizable,
  },
  computed: {
    active() {
      return this.isOpened ? ['r', 'rb', 'b', 'lb', 'l', 'lt', 't', 'rt'] : ['r', 'l']
    },
    isOpened() {
      return store.item && this.isMinimized === false
    },
  },
  watch: {
    "store.item.window": {
      handler() {
        if (store.item === null) return
        store.item.style = convert(store.item.window)
      },
      deep: true,
    }
  },
  methods: {
    minimize() {
      this.isMinimized = !this.isMinimized
    },
    add(property) {
      store.item.window.push({ property, active: false })
      this.reset()
    },
    reset() {
      this.ruleName = ''
    },
    remove(indexToRemove) {
      store.item.window = store.item.window.filter(
        (item, index) => !(index === indexToRemove)
      )
    },
  }
}
</script>
