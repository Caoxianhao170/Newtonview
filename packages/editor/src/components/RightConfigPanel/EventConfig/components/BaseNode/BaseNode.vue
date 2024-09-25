<template>
	<div class="node-container">
		<div class="top-bar">
			<span>{{props.title}}</span>
			<CloseCircleOutlined/>
		</div>
		<div class="desc">{{desc}}</div>
		<div class="custom-content">
        <slot></slot>
    </div>
	</div>
	<slot name="linkNode"></slot>
</template>

<script setup>
import { CloseCircleOutlined } from '@ant-design/icons-vue';
import { Handle, Position } from '@vue-flow/core'

const props = defineProps({
	id: { type: String, default: '' },
	title: { type: String, default: '标题' },
  desc: { type: String, default: '描述内容' },
});

</script>

<style scoped lang="less">
.node-container {
	background: #fff;
	border: 1px solid rgba(185, 181, 181, 0.51);
	border-radius: 8px;
	width: 400px;
  .top-bar {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid rgba(185, 181, 181, 0.51);
		align-items: center;
		padding: 10px;
		font-size: 16px;
		font-weight: 700;
	}
	.desc {
		padding: 10px;
		font-size: 14px;
		color: #999;
	}
	.custom-content {
    padding: 10px;
	}
}

</style>