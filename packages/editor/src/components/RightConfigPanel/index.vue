<template>
	<Tabs v-model:activeKey="activeKey" class="config-panel">
		<TabPane
			class="pane-item"
			v-for="(tab, index) in tabConfig"
			:key="index"
			:tab="tab.name"
		>
			<SetterRender
				v-if="tabConfig[activeKey].key === 'config'"
				:attrs="$blocksMap[currentElementType]?.config.attrs"
			/>
			<EventConfig
				v-if="tabConfig[activeKey].key === 'events'"
			/>
			<ApiConfig
        v-if="tabConfig[activeKey].key === 'apis'"/>
		</TabPane>
	</Tabs>
</template>

<script setup>
import { ref, shallowRef,computed, defineAsyncComponent } from 'vue';
import { Tabs, TabPane } from 'ant-design-vue';
import SetterRender from '@/components/setterRender/index.vue';
import EventConfig from '@/components/RightConfigPanel/EventConfig/index.vue';
import ApiConfig from '@/components/RightConfigPanel/apiConfig/index.vue';
import {usePageStore} from "@/store/usePageStore.ts";
import {storeToRefs} from "pinia";
const tabConfig = shallowRef([
  {
    key: 'config',
		name: '属性',
	},
  {
    key: 'style',
    name: '样式',
  },
	{
    key: 'events',
    name: '事件',
  },
	{
    key: 'apis',
    name: '数据源',
  },
]);

const pageAttrs = ref([
  {
    type: 'Title',
    label: '页面配置',
    key: 'pageConfig',
  },
  {
    type: 'Input',
    label: '页面背景色',
    name: ['pageConfig', 'color'],
    props: {
      placeholder: '请选择',
    },
  }
])

const pageState = usePageStore();
const { selectedElement } =storeToRefs(pageState);
const elementsMap = pageState.page.elementsMap;

// 当前选中的元素类型
const currentElementType = computed(() => {
  return elementsMap[selectedElement.value]?.type;
})
// 选中的tab页面
const activeKey = ref(0);
</script>

<style scoped>
.config-panel {
	height: 100%;
	overflow-y: auto;
}
.pane-item {
	padding: 0 10px;
}
</style>