<template>
	<FormItem v-bind="{...props?.config?.props.formItem}">
		<Input
			v-bind="{...props?.config?.props.formWrap}"
			:disabled="disabled"
			:style="props.config.style"
			:value="value"
			@change="e => onChange(e.target.value)"
			@blur="e => onChange(e.target.value)"
		/>
	</FormItem>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { PropType } from 'vue';
import { Input, FormItem } from 'ant-design-vue';

import { type ConfigType } from '@/types/index';
const props = defineProps({
	id: { type: String },
	type: { type: String },
	value: { type: String },
	config: { type: Object as PropType<ConfigType> },
});

const emits = defineEmits(['change', 'blur']);

// 隐藏属性
const visible = ref(true);
const show = () => { visible.value = true };
const hide = () => { visible.value = false };

// 禁用属性
const disabled = ref(false);
const disable = () => { disabled.value = true };
const enable = () => { disabled.value = false };

// 更新输入值
const onChange = (val: string) => {
  emits('change', val);
}

// 失焦事件处理器
const onBlur = (val: string) => {
  emits('blur', val);
}
</script>