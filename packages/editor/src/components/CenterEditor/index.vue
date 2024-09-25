<template>
	<div class="center-editor">
		<div class="editor-main" id="page" >
      <NewtonRender :elements="elements" id="root"/>
		</div>
  
	</div>
	
</template>

<script setup>

import NewtonRender from '@/components/NewtonRender/index.vue';
import {usePageStore} from "@/store/usePageStore.ts";

const pageState = usePageStore();
const elements = pageState.page.elements;

</script>

<style scoped lang="less">
.center-editor {
  position: relative;
  background: #f0f2f5;
	padding: 20px 20px 0 20px;
	height: 100%;
	overflow: auto;
	.editor-main {
		padding: 10px;
		background: #fff;
	}
}
</style>