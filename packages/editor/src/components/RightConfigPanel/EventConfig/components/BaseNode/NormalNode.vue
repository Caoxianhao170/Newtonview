<template>
	<BaseNode
		:title="props.title"
		:desc="props.desc"
	>
		<div class="slot-container">
      <slot></slot>
    </div>
    <template #linkNode>
      <Handle
        type="source"
        :position="Position.Right"
      />
      <Handle
        type="target"
        :position="Position.Left"
      />
		</template>
	</BaseNode>
</template>

<script setup>
import { Handle, Position } from '@vue-flow/core'
import BaseNode from './BaseNode.vue';

const props = defineProps({
  title: { type: String, default: '标题' },
  desc: { type: String, default: '描述内容' },
})

</script>

<style scoped>
.slot-container {
  padding: 10px;
  background: #f0f2f5;
  border-radius: 4px;
}
</style>