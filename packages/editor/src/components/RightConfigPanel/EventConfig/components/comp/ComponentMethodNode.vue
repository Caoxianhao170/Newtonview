<template>
	<NormalNode
		:title="title"
		:desc="des"
	>
		<FormItem label="目标组件">
			<Select v-model:value="props.data.target" placeholder="请选择目标组件" :options="options"/>
		</FormItem>
    <FormItem label="组件方法">
			<Select v-model:value="data.method"/>
    </FormItem>
		{{data}}
	</NormalNode>
</template>

<script setup>
import { ref } from 'vue';
import { FormItem, Select } from 'ant-design-vue';
import NormalNode from '../BaseNode/NormalNode.vue';

const props = defineProps({
	data: {
    type: Object,
	},
});

const data = defineModel('data');

const options = ref([
  {
    label: '表格',
    value: 'table',
	},
  {
    label: '表格1',
    value: 'table1',
  },
 
])

const title = ref('组件方法');
const des = ref('事件触发后，可以调用目标组件提供的方法，并自动传入参数。比如：表格的搜索、表单的提交、重置等。');
</script>

<style scoped>

</style>