<template>
  <div>
    <Cascader :options.sync="options" v-model="value" :lazyload="lazyload"></Cascader>
  </div>
</template>
<script>
import Cascader from './components/Cascader.vue';
import cityList from './data.json';

const fetchData = pid => new Promise((resolve) => {
  setTimeout(() => {
    resolve(cityList.filter(item => item.pid === `${pid}`));
  }, 1000);
});

export default {
  components: { Cascader },
  data() {
    return {
      value: [],
      options: [],
    };
  },
  async mounted() {
    this.options = await fetchData(0);
  },
  methods: {
    // async change(value) {
    //   const currentItem = value[value.length - 1];
    //   const children = await fetchData(currentItem.id);
    //   if (children) {
    //     this.$set(currentItem, 'children', children);
    //   }
    // },
    async lazyload(id, callback) {
      const children = await fetchData(id);
      callback(children);
    },
  },
};
</script>
