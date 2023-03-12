<template>
  <template v-for="({ id, children }) in tree.children" :key="id">
    <input :id="'view-' + id" v-bind="children.size ? { type: 'checkbox' } : { type: 'radio', name: 'explorer', value: id }">
    <label :for="'view-' + id">{{ id }}</label>
    <div v-if="children.size" class="dir_wrapper">
      <TreeView :tree="children" />
    </div>
  </template>
</template>

<script>
export default {
  name: 'TreeView',
  props: {
    tree: Object
  }
}
</script>
