<template>
  <template v-for="({ id, children }) in tree.children" :key="id">
    <input :id="'view-' + id" v-bind="children.size ? { type: 'checkbox' } : { type: 'radio', name: 'explorer', value: id }">
    <label :for="'view-' + id" class="flex">
      <Icon v-if="children.size" :d="mdiFolderOpen" class="folder-open h-5 w-5 text-gray-600 hover:text-gray-700" />
      <Icon v-if="children.size" :d="mdiFolder" class="folder-close h-5 w-5 text-gray-600 hover:text-gray-700" />
      {{ id }}
    </label>
    <div v-if="children.size" class="dir_wrapper">
      <TreeView :tree="children" />
    </div>
  </template>
</template>

<script>
import Icon from '@/components/Icon.vue'
import { mdiFolderOpen, mdiFolder } from '@mdi/js';

export default {
  name: 'TreeView',
  components: {
    Icon
  },
  props: {
    tree: Object
  },
  data () {
    return { mdiFolderOpen, mdiFolder }
  },
}
</script>
