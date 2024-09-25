<template>
	<Drawer
		title="事件流"
		:open="drawerVisible"
		placement="top"
		width="100vw"
		height="100vh"
		:bodyStyle="{padding: '0px'}"
		@close="closeDrawer"
	>
		<template #extra>
      <a-button style="margin-right: 8px" @click="closeDrawer">取消</a-button>
      <a-button type="primary" @click="saveEventFlow">保存</a-button>
		</template>
		<div class="body-container" @drop="onDrop">
      <div class="left-node-pane">
				<div
					v-for="(eventAction, index) in eventActionConfig"
					:key="index"
        >
					<div class="action-title">{{eventAction.title}}</div>
					<div
						class="action-label"
						v-for="(action, actionIndex) in eventAction.actions"
						:key="actionIndex"
            @dragstart="onDragStart($event, action.type, action.defaultNodeConfig)"
						:draggable="true"
          >
						{{action.name}}
					</div>
				</div>
			</div>
			<VueFlow
				class="vue-flow-container"
				v-model:nodes="nodes"
				v-model:edges="edges"
        @dragover="onDragOver"
				@dragleave="onDragLeave"
			>
				<template
					v-for="(item , index) in slotComponents"
					:key="index"
					#[`node-${item.slotName}`]="props"
				>
					<component :is="item.component" v-model:data="props.data" />
				</template>
				<Background variant="lines"/>
			</VueFlow>
		</div>
	</Drawer>
</template>

<script setup>
import { ref, shallowRef, defineExpose, defineAsyncComponent } from 'vue';
import { Drawer } from 'ant-design-vue';
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import useDragAndDrop from '@/hooks/useDnd.js';

const emits = defineEmits(['saveEventFlow']);
const { onConnect, addEdges,  } = useVueFlow()

const { onDragOver, onDrop, onDragLeave, isDragOver, onDragStart } = useDragAndDrop()

onConnect(addEdges);


// 当前事件名
const currentEventName = ref('');

// 保存事件流
const saveEventFlow = () => {
  emits('saveEventFlow', {
    eventName: currentEventName.value,
    actions: {
      nodes: nodes.value,
      edges: edges.value,
    }
  });
}

// 抽屉可见性
const drawerVisible = ref(false);

const showDrawer = (eventName, actions) => {
  drawerVisible.value = true;
  currentEventName.value = eventName;
  updateNodesAndEdges(actions);
};

const closeDrawer = () => {
  drawerVisible.value = false;
}

// 组件节点
const nodes = ref([]);

// these are our edges
const edges = ref([]);

// 更新节点、边数据
const updateNodesAndEdges = (actions) => {
  const { nodes:curNodes = [], edges:curEdges = [] } = actions;
  nodes.value = [...curNodes];
  edges.value = [...curEdges];
}


const slotComponents = shallowRef([
  {
    slotName: 'open-modal',
		component: defineAsyncComponent(() => import('./modal/OpenModalNode.vue')),
	},
  {
    slotName: 'component-method',
    component: defineAsyncComponent(() => import('./comp/ComponentMethodNode.vue')),
  },
  {
    slotName: 'start',
    component: defineAsyncComponent(() => import('./BaseNode/StartNode.vue')),
  },
  {
    slotName: 'send-request',
    component: defineAsyncComponent(() => import('./request/SendRequest.vue')),
  },
]);
// 事件行为配置
const eventActionConfig = shallowRef([
  {
    title: '流程',
		actions: [
      {
        name: '开始',
				type: 'start',
				eventName: 'start',
			},
		]
	},
  {
    title: '弹窗',
		actions: [
      {
        name: '打开弹窗',
				type: 'open-modal',
				eventName: 'openModal',
				defaultNodeConfig: {
          target: undefined,
				},
			},
      {
        name: '关闭弹窗',
        type: 'close-modal',
        eventName: 'closeModal',
      },
		]
	},
  {
    title: '组件',
		actions: [
      {
        name: '组件方法',
				type: 'component-method',
				eventName: 'componentMethod',
        defaultNodeConfig: {
          target: 'table',
					method: undefined,
        },
			}
		],
	},
  {
    title: '请求',
		actions: [
      {
        name: '发送请求',
        type: 'send-request',
        eventName: 'sendRequest',
        defaultNodeConfig: {
          api: undefined,
				}
      }
		]
	}
]);

defineExpose({ showDrawer, closeDrawer });

</script>

<style scoped>
.body-container {
	position: relative;
  height: calc(100% - 30px);
  width: 100%;
}
.vue-flow-container {
	min-height: 100px;
	min-width: 100px;
	height: 100%;
	width: 100%;
}
.left-node-pane {
  position: absolute;
	left: 10px;
	top: 10px;
	padding: 10px;
	bottom: 10px;
	height: calc(100% - 20px);
	width: 250px;
	background: #f0f2f5;
	z-index: 100;
	border-radius: 4px;
	border: 1px solid #f0f2f5;
}

.action-title {
	font-size: 16px;
  font-weight: bold;
  padding: 10px 0;
	background: #f0f2f5;
}

.action-label {
	border-bottom: 1px solid #d9d9d9;
	border-radius: 4px;
  padding: 10px 20px;
	margin-bottom: 10px;
	background: #fff;
  cursor: pointer;
}
</style>