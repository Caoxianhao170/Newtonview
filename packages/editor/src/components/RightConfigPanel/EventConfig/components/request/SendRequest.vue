<template>
	<ConditionNode
		title="发送请求"
		desc="调用一个已配置好的的接口"
	>
		<FormItem label="配置请求">
      <Select
				v-model:value="props.data.api"
				placeholder="请选择接口"
			/>
    </FormItem>
	</ConditionNode>
</template>

<script setup>
import { Select, FormItem } from 'ant-design-vue'
import ConditionNode from '../BaseNode/ConditionNode.vue';

const props = defineProps({
  data: {
    type: Object,
  },
});

const data = defineModel('data');
</script>