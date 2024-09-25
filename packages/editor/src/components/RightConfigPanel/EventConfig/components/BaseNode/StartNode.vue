<template>
	<BaseNode
		title="开始"
		desc="事件流起点"
	>
    <Handle
      type="source"
      :position="Position.Right"
    />
	</BaseNode>
</template>

<script setup>
import {Handle, Position} from "@vue-flow/core";
import BaseNode from './BaseNode.vue';

defineOptions({
  inheritAttrs: false
})
</script>

<style scoped>

</style>