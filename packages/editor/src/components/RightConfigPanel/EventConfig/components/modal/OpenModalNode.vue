<template>
  <NormalNode title="打开弹窗" :desc="des">
    <FormItem label="选择弹框">
      <Select
        v-model:value="props.data.target"
        placeholder="请选择弹窗"
        :options="modalList"
      />
    </FormItem>
    <div>{{data}}</div>
  </NormalNode>
</template>

<script setup>
import { ref, computed } from 'vue';
import { storeToRefs} from 'pinia';
import { usePageStore } from '@/store/usePageStore.ts';
import { Select, FormItem } from 'ant-design-vue';
import NormalNode from '../BaseNode/NormalNode.vue';

const props = defineProps({
  data: {
    type: Object,
  },
});

const data = defineModel('data');

const pageStore = usePageStore();
const elements = pageStore.page.elements;

const modalList = computed(() => {
  const list = [];
  elements.forEach(element => {
    if (element.type === 'Modal') {
      list.push({
        label: element.id,
        value: element.id,
      });
    }
  });
  return list;
});


const des = ref('触发一个按钮、表单等事件动作后，可以通过此行为来打开一个弹框，前提是需要先创建一个弹框。');

const options = ref([
  {
    label: '弹窗1',
    value: 'modal1'
  }
])
</script>

<style scoped>

</style>
