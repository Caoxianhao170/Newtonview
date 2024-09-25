<template>
	<div class="left-blocks">
    <div class="icon-container">
      <div
				class="icon-item"
				v-for="(funcBlock, key) in tabConfig"
				:key="key"
				:style="`background: ${activeKey === key ? '#b1d4f4' : ''}`"
				@click="activeKey=key"
			>
				<AppstoreOutlined v-if="funcBlock.icon === 'AppstoreOutlined'"/>
				<ClusterOutlined v-if="funcBlock.icon === 'ClusterOutlined'"/>
			</div>
		</div>
		<div class="content-body">
      <component :is="tabConfig[activeKey].component" />
		</div>
		
	</div>
	
</template>

<script setup>
import { shallowRef, ref, defineAsyncComponent } from 'vue';
import { AppstoreOutlined, ClusterOutlined } from '@ant-design/icons-vue';
import BlockMenu from './BlockMenu.vue';

const activeKey = ref(0);

const tabConfig = shallowRef([
  {
    icon: 'AppstoreOutlined',
		component: defineAsyncComponent(() => import('./BlockMenu.vue')),
	},
  {
    icon: 'ClusterOutlined',
    component: defineAsyncComponent(() => import('./JsonPreview/index.vue')),
  },
]);
</script>

<style scoped lang="less">
.left-blocks {
	height: 100%;
	width: 100%;
	display: flex;
	.icon-container {
		height: 100%;
		border-right: 1px #f0f2f5 solid;
		.icon-item {
			padding: 10px 15px;
			font-size: 20px;
		}
	}
	.content-body {
		height: 100%;
		width: 100%;
		overflow: auto;
		padding: 10px;
	}
}
</style>