<template>
	<div class="event-config-container">
    <div class="add-event">
      <DropdownButton type="primary">
        添加事件
        <template #overlay>
          <Menu>
            <MenuItem
              v-for="(event, index) in currentEvents"
              :key="index"
              @click="addEvent(event)"
            >
              {{event.name}}
            </MenuItem>
          </Menu>
        </template>
      </DropdownButton>
    </div>
    <div class="event-item" v-for="(item, index) in eventList">
      <span>{{item.nickName}}</span>
      <span>
			<EditOutlined style="margin-right: 20px" @click="openDrawer(item)"/>
			<DeleteOutlined/>
		</span>
    </div>
		<EventFlow ref="eventFlowRef" @saveEventFlow="saveEvents"/>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { DropdownButton, Menu, MenuItem } from 'ant-design-vue';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { usePageStore } from '@/store/usePageStore.ts'
import {storeToRefs} from "pinia";
import EventFlow from './components/EventFlow.vue';

const pageState = usePageStore();
const { selectedElement } =storeToRefs(pageState);
const elementsMap = pageState.page.elementsMap;
const editElement = pageState.editElement;

// 当前组件事件
const currentEvents = ref([]);
// 已添加的事件
const eventList = ref([]);
watch(selectedElement, (newVal) => {
  currentEvents.value = elementsMap[newVal]?.events;
  eventList.value = elementsMap[newVal].config.events;
}, { immediate: true});
//
const addEvent = event => {
  const { name, value } = event;
  const addItem = {
		nickName: name,
		eventName: value,
		actions: {
      nodes: [],
			edges: [],
		}
	};
  eventList.value.push(addItem);
  
  editElement({
		id: selectedElement.value,
		type: 'events',
		events: eventList.value,
	});
}

// 打开事件流程图
const openDrawer = (item) => {
  eventFlowRef.value.showDrawer(item.eventName, item.actions);
}

// 保存事件流
const saveEvents = ({ eventName, actions }) => {
	eventList.value.forEach(item => {
    if (item.eventName === eventName) {
      item.actions = actions;
    }
  });
  eventFlowRef.value.closeDrawer();
  editElement({
    id: selectedElement.value,
    type: 'events',
    events: eventList.value,
  });
}

// 事件流
const eventFlowRef = ref(null);
</script>

<style scoped>
.event-config-container {
	padding: 10px;
}
.add-event {
	display: flex;
}
.event-item {
	display: flex;
	justify-content: space-between;
	padding: 10px;
	border-bottom: 1px solid #f0f2f5;
}
</style>