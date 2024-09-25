<template>
	<div>
    <Button class="add-button" @click="add" size="small">新增按钮</Button>
		<div
			class="button-item"
			v-for="(button, index) in bulkActionList"
			:key="index"
		>
			<span class="button-label">按钮名称:</span>
			<Input :value="button.text" size="small"/>
		</div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Button, Input } from 'ant-design-vue';
import { createId } from '@/utils/helper';
import { usePageStore } from '@/store/usePageStore.ts';

const { editEvents, selectedElement, editElement } = usePageStore();
const { elementsMap } = usePageStore().page;

// 批量操作列表
const bulkActionList = computed(() => {
  const props = elementsMap[selectedElement].config.props;
  return props.bulkActionList;
});

// 新增按钮
const add = () => {
  const props = elementsMap[selectedElement].config.props;
  const events = elementsMap[selectedElement].events;
  const addItem = {
    text: '新增',
		type: 'primary',
		eventName: createId('BulkAction'),
	};
  props.bulkActionList.push(addItem)
  events.push({
		name: addItem.text + '事件',
		value: addItem.eventName,
	});
  
  editElement({
    id: selectedElement,
    type: 'props',
    props: props,
	});
  
  editEvents({
		id: selectedElement,
		events,
	});
}

</script>

<style scoped lang="less">
.add-button {
	margin-bottom: 10px;
}
.button-item {
	display: flex;
	margin-bottom: 10px;
	.button-label {
		width: 80px;
	}
}
</style>