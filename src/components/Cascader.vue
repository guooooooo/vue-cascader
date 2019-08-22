<template>
  <div class="cascader" v-click-outside="close">
    <div class="title" @click="toggle">
      title
    </div>
    <div v-if="isVisible">
      <cascader-item :options="options" :value="value" :level="0" @change="change"></cascader-item>
    </div>
  </div>
</template>
<script>
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
  methods: {
    change(value) {
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
  border 1px solid #ccc
</style>
