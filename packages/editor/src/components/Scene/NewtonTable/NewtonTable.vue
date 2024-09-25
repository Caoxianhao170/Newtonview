<template>
	<div
		:data-id="props.id"
		:data-type="props.type"
		:style="props.config.style"
	>
		<div>
			<div>
				<Button
					v-for="(item, index) in bulkActionList"
          :key="item.eventName"
					:type="item.type"
        	:icon="item.icon"
        	@click="handleOperate(item.eventName)">
					{{item.text}}
				</Button>
			</div>
		</div>
    <Table
      v-bind="{...tableProps}"
    ></Table>
	</div>
	
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Table, Button } from 'ant-design-vue';
import { handleActionFlow } from '@/utils/action';
import { ComponentType } from "@/types/index.ts";

export interface IConfig {
  bordered: boolean;
  size: 'small' | 'middle' | 'large';
  rowKey: string,
	selectionType: 'checkBox' | 'radio';
  leftTitle: string;
  empty: string;
  bulkActionList: any[];
  columns: any[];
  hidePager: boolean;
  pagination: any;
  field: {
    pageNum: string;
    pageSize: string;
    total: string;
  };
  scroll?: {
    x: number;
    y: number;
  };
  sourceField: string;
  source: any;
}

const props = defineProps<ComponentType<IConfig>>();

const emits = defineEmits([
  'search',
	'reload',
	'clearData',
	'startLoading',
	'stopLoading',
	'checkSelectedRow',
	'setSelectedRowKeys',
	'getSelectedRowKeys',
	'getSelectedRow',
]);

const tableProps = computed(() => {
  const { rowKey, bordered, size, columns } = props.config.props;
  
	return {
    rowKey: rowKey || 'id',
    bordered,
    size,
    columns,
	}
});

const searchParams = ref({});

const bulkActionList = computed(() => {
  return props.config.props.bulkActionList;
});
const handleOperate = (eventName) => {
  const btnEvent = props.config.events.find(event => event.eventName === eventName);
  if (btnEvent) {
    handleActionFlow(btnEvent.actions as any, {});
  } else {
    console.log('没有找到对应的事件');
	}
}
</script>

<style scoped>

</style>