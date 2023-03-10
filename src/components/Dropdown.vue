<template>
    <Menu as="div" class="relative inline-block text-left">
        <div class="flex">
            <slot />
        </div>

        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems
                class="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1">
                    <MenuItem v-for="(item, index) in items" :key="index" v-slot="{ active }">
                        <button :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm w-full text-left']" @click="item.click">{{ item.name }}</button>
                    </MenuItem>
                </div>
        </MenuItems>
    </transition>
</Menu></template>
  
<script>
import { Menu, MenuItem, MenuItems } from '@headlessui/vue'

export default {
  name: 'DropDown',
  components: { Menu, MenuItem, MenuItems },
  props: {
    items: Array
  }
}
</script>