<template>
  <div class="cascader" v-click-outside="close">
    <div class="title" @click="toggle">
      {{result}}
    </div>
    <div v-if="isVisible">
      <cascader-item :options="options" :value="value" :level="0" @change="change"></cascader-item>
    </div>
  </div>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep';
import dirs from '../directives/clickOutside';
import CascaderItem from './CascaderItem.vue';

export default {
  name: 'Cascader',
  directives: {
    clickOutside: dirs.clickOutside,
  },
  components: {
    CascaderItem,
  },
  props: {
    lazyload: {
      type: Function,
    },
    value: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  computed: {
    result() {
      return this.value.map(item => item.label).join('/');
    },
  },
  methods: {
    handle(id, children) {
      const options = cloneDeep(this.options);
      // 广度优先遍历
      let stack = [...options];
      let index = 0;
      let current;
      while (current = stack[index++]) {
        if (current.id !== id) {
          if (current.children) {
            stack = stack.concat(current.children);
          }
        } else {
          break;
        }
      }
      if (current) {
        current.children = children;
        this.$emit('update:options', options);
      }
    },
    change(value) {
      const lastItem = value[value.length - 1];
      const { id } = lastItem;
      if (this.lazyload) {
        this.lazyload(id, children => this.handle(id, children));
      }
      this.$emit('input', value);
    },
    close() {
      this.isVisible = false;
    },
    toggle() {
      this.isVisible = !this.isVisible;
    },
  },
};
</script>
<style lang="stylus" scoped>
.cascader
  display inline-block
.title
  width 150px
  height 30px
  line-height 30px
  border 1px solid #ccc
</style>
