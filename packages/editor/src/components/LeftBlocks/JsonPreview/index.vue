<template>
	<vue-json-pretty class="json-preview-container" :data="pageStore.page" />
</template>

<script setup>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { usePageStore } from '@/store/usePageStore.ts';

const pageStore = usePageStore()
</script>

<style>
.json-preview-container {
	width: 100%;
	height: 100%;
	overflow: auto;
}
</style>