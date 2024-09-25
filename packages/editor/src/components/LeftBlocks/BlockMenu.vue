<template>
	<div v-for="(categoryItem, index) in blocksList" :key="index">
    <div class="title">{{categoryItem.category}}</div>
		<SmoothDndContainer
      behaviour="copy"
      group-name="blocks"
      orientation="horizontal"
      :get-child-payload="(idx:number) => postPayload(idx,categoryItem.list)"
      tag="div"
			class="block-container"
		>
			<SmoothDndDraggable v-for="block in categoryItem.list" :key="block.type">
				<div class="blockItem">{{block.name}}</div>
			</SmoothDndDraggable>
		</SmoothDndContainer>
  
	</div>
</template>

<script setup lang="ts">
import { shallowRef, inject } from 'vue';
import { blocks } from "./config.ts";
import { SmoothDndContainer } from '@/components/SmoothDnd/SmoothDndContainer.ts';
import { SmoothDndDraggable } from '@/components/SmoothDnd/SmoothDndDraggable.ts'


const blocksList = shallowRef(blocks);

const blocksMap = inject('blocksMap');

const postPayload = (index:number, list:[]) => {
  return {...list[index]};
}
</script>

<style scoped>
.title {
	font-size: 17px;
	font-weight: 700
}

.block-container {
	padding: 10px;
}

.blockItem {
	padding: 5px 10px;
	height: 25px;
	width: 70px;
	overflow: hidden;
	text-align: center;
	text-overflow: ellipsis;
	white-space: nowrap;
	background: #f0f2f5;
  border: 1px solid #ffffff;
  margin: 5px;
  cursor: pointer;
}
</style>