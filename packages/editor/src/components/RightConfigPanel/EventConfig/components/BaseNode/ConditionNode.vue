<template>
	<BaseNode
		:title="props.title"
		:desc="props.desc"
	>
	<div class="condition-body">
		<div class="setting">
			<slot></slot>
		</div>
    <div class="condition-branch">
      <div class="success">
				<FormItem label="IF">
					<span>成功条件</span>
				</FormItem>
        <Handle
          class="source-success"
          id="source-success"
          type="source"
          :position="Position.Right"
        />
			</div>
      <div class="error">
        <FormItem label="Else">
          <span>失败</span>
        </FormItem>
        <Handle
          class="source-error"
          id="source-error"
          type="source"
          :position="Position.Right"
        />
			</div>
    </div>
	</div>
 	<template #linkNode>
    <Handle
      type="target"
      :position="Position.Left"
    />
	</template>
	</BaseNode>
 
 
</template>

<script setup>
import { FormItem } from 'ant-design-vue';
import BaseNode from './BaseNode.vue';
import { Handle, Position } from '@vue-flow/core';

const props = defineProps({
	title: { type: String },
	des: { type: String },
})


</script>

<style scoped lang="less">
.condition-body {
  padding: 10px;
  background: #f0f2f5;
  border-radius: 4px;
	min-height: 200px;
}
.setting {
	width: 100%;
}
.condition-branch {
	width: 100%;
	justify-items: right;
  min-height: 200px;
  .success {
		background: #fff;
		padding-left: 10px;
		position: relative;
		border-radius: 4px;
		margin-bottom: 10px;
		.source-success {
			width: 10px;
			height: 10px;
			background: green;
		}
  }
  .error {
    background: #fff;
    padding-left: 10px;
    border-radius: 4px;
    position: relative;
    height: 49%;
		.source-error {
      width: 10px;
      height: 10px;
      background: red;
		}
  }
}
</style>