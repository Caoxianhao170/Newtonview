<template>
	<SmoothDndContainer
    drag-handle-selector=".handle"
    group-name="blocks"
    :orientation="orientation"
    tag="div"
		@drop="updateBlocks"
		class="newton-render"
		:class="orientation === 'horizontal' ? 'inline' : ''"
	>
    <SmoothDndDraggable
			v-for="(element, index) in props.elements"
			:key="element.id"
      class="drag-container"
      :class="selectedElement === element.id ? 'selected-border' : ''"
      @click.stop="selectBlock(element.id)"
    >
      <component
				v-if="props.id?.includes('SearchForm')"
        :ref="ref => setComponentRef(element.id, ref)"
        :is="$blocksMap[element?.type].material"
        :id="element.id"
        :type="element.type"
        :config="elementsMap[element.id]?.config"
        :elements="element.elements"
				:value="curFormData[getFormDataField(element.id)]"
				@change="value => curFormData[getFormDataField(element.id)] = value"
      />
      <component
				v-else
        :ref="ref => setComponentRef(element.id, ref)"
        :is="$blocksMap[element?.type].material"
        :id="element.id"
        :type="element.type"
        :config="elementsMap[element.id]?.config"
        :elements="element.elements"
        v-on="getListenEventAndActionMap(element.id)"
      />
			<div v-if="selectedElement === element.id" class="block-wrap">
				<HolderOutlined class="icon-class handle"/>
				<DeleteOutlined class="icon-class" @click="removeBlock(element.id)"/>
			</div>
    </SmoothDndDraggable>
		<div v-if="!elements?.length" class="slots">请拖入元素至该区域</div>
	</SmoothDndContainer>
</template>

<script setup lang="ts">
import { inject, ref, onMounted, watch } from 'vue';
import type { PropType } from 'vue';
import { storeToRefs } from 'pinia';
import { HolderOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { createId } from '@/utils/helper';
import { setComponentRef } from '@/utils/useComponentRefs'
import { SmoothDndContainer } from '@/components/SmoothDnd/SmoothDndContainer.ts';
import { SmoothDndDraggable } from '@/components/SmoothDnd/SmoothDndDraggable.ts'
import { ComItemType } from '@/types/index';
import { usePageStore } from '@/store/usePageStore';

// 注入物料
const blocksMap = inject('blocksMap');

// 定义属性
const props = defineProps({
	id: { type: String },
  orientation: {type: String, default: 'vertical'},
	// 默认插槽的内容
	defaultSlotText: { type: String },
  elements: { type: Array as PropType<ComItemType[]>,}
});

// 整个页面状态
const pageState = usePageStore();
const { selectedElement } = storeToRefs(pageState);
const { addElement, moveElement, setFormData, selectCurrentElement, removeElement } = pageState;
const { formData, elementsMap } = pageState.page;

const curFormData = ref({});
onMounted(() => {
  if (props.id.includes('SearchForm')) {
    curFormData.value = formData[props.id];
  }
});


type operateType = 'add' | 'sort' | 'remove' | 'inner' | 'outer';
const updateBlocks = (e) => {
  const { addedIndex, removedIndex } = e;
  const operate:operateType = getOperateType(addedIndex, removedIndex)
	switch( operate) {
		case 'add':
      addBlock(e);
      break;
		case 'remove':
      break;
		default:
      break;
	}
};
const addBlock = (e: any) => {
  const { addedIndex, removedIndex, payload: { name, type } = {} } = e;
  const { config = {}, events = [], methods = [], elements = [] } = blocksMap[type].config;
  const addId = createId(type);
  const element = {
    id: addId,
    parentId: props.id || 'root',
    type,
    name,
    elements: [],
    config,
    events,
    methods,
  };
  if (type === 'SearchForm')  {
    setFormData({
			name: addId,
			value: {},
		});
	}
  addElement(element, addedIndex);
}

const moveBlock = (e) => {
  const { addedIndex, removedIndex } = e;
  moveElement({ addedIndex, removedIndex });
}

const removeBlock = (id: string) => {
  console.log(id);
  removeElement(id);
}

// 选中物料
const selectBlock = (id: string) => {
  console.log(id);
  selectCurrentElement(id);
}

const getOperateType = (addIndex, removeIndex) => {
  let operateType;
  if (addIndex !== null && removeIndex == null) {
    operateType = 'add';
	} else if (addIndex !== null && removeIndex !== null) {
    operateType = 'move';
	} else if (addIndex === null && removeIndex !== null) {
    operateType = 'remove';
	} else {
    // 不处理
	}
  return operateType;
}

// 获取组件事件监听列表
const getListenEventAndActionMap = (id: string) => {
  const events = elementsMap[id]?.config?.events || [];
  const eventAndActionMap = {};
  events.forEach(event => {
    const { eventName, actions } = event;
    eventAndActionMap[eventName] = (params) => {
    	console.log(eventName, actions, params);
		}
  });
  return eventAndActionMap;
}

const getFormDataField = (id) => {
  const element = elementsMap[id];
  const { name } = element?.config?.props?.formItem || {};
  return name;
}
</script>

<style scoped lang="less">
.newton-render {
	.slots {
		border-radius: 3px;
		padding: 5px;
		background: #f0f2f5;
	}
	.drag-container {
		height: auto;
		position: relative;
    .block-wrap {
			padding: 0 5px;
      position: absolute;
      right: 0;
      top: 0;
			z-index: 100;
      border-radius: 4px;
      background: #333;
      .icon-class {
        color: #fff;
        font-size: 12px;
				margin-right: 5px;
      }
      .icon-class:hover {
				cursor: pointer;
        background: rgba(66, 62, 62, 0.51);
      }
    }
	}
}
.inline {
  display: flex;
  flex-wrap: wrap;
}
.selected-border {
  border: 1px solid #6ba6ff;
}
</style>