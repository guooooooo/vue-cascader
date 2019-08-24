<template>
  <div class="content">
    <div class="content-left">
      <div class="label" v-for="(item, index) in options" :key="index" @click="select(item)">
        {{item.label}}
      </div>
    </div>
    <div class="content-right" v-if="lists && lists.length">
      <CascaderItem :options="lists" :level="level+1" @change="change" :value="value"></CascaderItem>
    </div>
  </div>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep';

export default {
  name: 'CascaderItem',
  props: {
    level: {
      type: Number,
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
      currentSelected: null,
    };
  },
  computed: {
    lists() {
      if (this.value[this.level] && this.value[this.level].id) {
        const o = this.options.find(item => item.id === this.value[this.level].id);
        return o.children;
      }
      return [];

      // 总的options变化率不会触发更新
      // return this.value[this.level] && this.value[this.level].children;
    },
  },
  methods: {
    change(value) {
      this.$emit('change', value);
    },
    select(item) {
      const cloneValue = cloneDeep(this.value);
      cloneValue[this.level] = item;
      cloneValue.splice(this.level + 1);
      this.$emit('change', cloneValue);
      this.currentSelected = item;
    },
  },
};
</script>
<style lang="stylus" scoped>
.content
  display flex
.content-left
  border 1px solid #ccc
  min-height 100px
  max-height 150px
  overflow-y auto
.content-right
  margin-left -1px
.label
  width 60px
  font-size 12px
  line-height 20px
  color #606266
  padding-left 10px
  cursor pointer
.label:hover
  background #f5f7fa
</style>
