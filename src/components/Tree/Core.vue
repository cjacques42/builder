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
  background: #34434d;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  input[type="radio"],
  input[type="checkbox"] {
    width: 0;
    height: 0;
    opacity: 0;
    position: absolute;
    margin: 0;
  }

  label {
    display: block;
    width: 100%;
    font-size: 14px;
    color: white;
    height: 30px;
    line-height: 30px;
    padding: 0 8px;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
      color: #a4d3ff;
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
    color: #e9f2ff;
    padding-left: 30px;

    &:hover {
      color: #a4d3ff;
    }
  }

  input[type="radio"]:checked+label {
    color: #5298fc;
  }

  input[type="checkbox"]:checked+label+.dir_wrapper {
    display: block;
  }
}

.file_tree input[type="checkbox"]+label {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAABQCAYAAABxs9dPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc0Q0FDNEY5NDFGQjExRTQ4MEQ4ODY5MEFBODE4RDk2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc0Q0FDNEZBNDFGQjExRTQ4MEQ4ODY5MEFBODE4RDk2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzRDQUM0Rjc0MUZCMTFFNDgwRDg4NjkwQUE4MThEOTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzRDQUM0Rjg0MUZCMTFFNDgwRDg4NjkwQUE4MThEOTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7T+9ssAAABJ0lEQVR42uzZMQrCMBgF4FbE0UFPILg5qdAbCA7q5qK7p3Bw8BK6u4giboKCJxDB1cFdsOjapb5ACyoiNG3pj30P3hj4SBOaEPP6cFwjWG5oAz0aMSSjMaaIbtGqFJCP2qE1KSCVgjdTkaKyIccr1B49SwGp5NF6HCAbvRjJpOTN9htog/YTAs3QXthFbUja9gQRRBBBBBFEEEEEpQVkalyl0zVD6tYxlfbJZK0h13W5ywgiiCCCCCKIIIII+nGmnp/u4g75k4Bj1IviCHXiAg00xlXQbhwo3TXUQRdoTtKibqPLqFFhH/Ba6BpdSQGpNL3+793ej3pRHCbkGPuz/PnmekgIZPNfRhBBBBFEEEEEEURQ8DO1pXGtjirWN1DZKz/Za54CDABbrytKn66XKwAAAABJRU5ErkJggg==);
  background-size: 18px 40px;
  background-position: top 7px left 6px;
  background-repeat: no-repeat;
  vertical-align: middle;

  &:hover {
    background-position: top -18px left 6px;
  }
}

body {
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
}</style>
  