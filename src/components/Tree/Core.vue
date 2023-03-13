<template>
  <div class="file_tree">
    <TreeView :tree="store.tree" />
  </div>
</template>
  
<script>
import TreeView from '@/components/Tree/View.vue'
import { store } from '@/store.js'

export default {
  name: 'TreeCore',
  components: {
    TreeView
  },
  props: {
    tree: Object
  },
  data () {
    return { store }
  },
}
</script>

<style lang="scss">
.file_tree {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  input[type="radio"],
  input[type="checkbox"] {
    height: 0;
    opacity: 0;
    position: absolute;
  }

  label {
    font-size: 14px;
    color: #000000;
    margin: 2px 0;
    cursor: pointer;
    white-space: nowrap;

    .folder-open {
      display: none;
    }
    .folder-close {
      display: block;
    }

    &:hover {
      color: #000000;
    }
  }

  .dir_wrapper {
    display: none;
    padding-left: 28px;
  }

  .dir_wrapper label {
    padding-left: 0;
  }

  input[type="checkbox"]+label {
    color: #000000;

    svg {
      margin-right: 8px;
    }

    &:hover {
      color: #000000;
    }
  }

  input[type="radio"]:checked+label {
    color: #5298fc;
  }

  input[type="checkbox"]:checked+label {
    .folder-open {
      display: block;
    }
    .folder-close {
      display: none;
    }
  }

  input[type="checkbox"]:checked+label+.dir_wrapper {
    display: block;
  }
}

.file_tree input[type="checkbox"]+label {
  &:hover {
    background-position: top -18px left 6px;
  }
}
</style>
  