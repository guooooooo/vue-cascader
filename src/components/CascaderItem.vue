<template>
  <div class="content">
    <div class="content-left">
      <div class="label" v-for="(item, index) in options" :key="index" @click="select(item)">
        {{item.label}}
      </div>
    </div>
    <div class="content-right" v-if="lists && lists.length">
      <CascaderItem :options="lists"></CascaderItem>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CascaderItem',
  props: {
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
      return this.currentSelected && this.currentSelected.children;
    },
  },
  methods: {
    select(item) {
      this.currentSelected = item;
    },
  },
};
</script>
<style lang="stylus" scoped>
.content
  display flex
</style>
