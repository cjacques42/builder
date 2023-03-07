<template>
  <component v-for="({ id, tag, focus, style, children }) in tree" :key="id" :id="id" :is="tag" :class="{ 'is-hovered': focus }" :style="style">
    <Rendering :tree="children" />
  </component>
</template>

<script>
import Rendering from '@/components/Rendering.vue'

export default {
  name: 'CoreRendering',
  components: { Rendering },
  props: {
    tree: Array
  },
}
</script>
