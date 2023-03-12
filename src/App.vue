<template>
  <div>
    <Builder />
    <Window />
  </div>
</template>

<script>
import Builder from './components/Builder.vue'
import Window from './components/Window.vue'

export default {
  name: 'App',
  components: {
    Builder,
    Window
  }
}
</script>

<style>
  .is-hovered {
    background: #98CBCD !important;
  }
</style>