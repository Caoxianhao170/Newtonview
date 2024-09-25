<template>
	<FormItem
		v-if="visible"
		v-bind="{...props.config.props.formItem}"
		:data-id="props.id"
		:auto-link="true"
		:data-type="props.type">
		<Select
			v-bind="props.config.props.formWrap"
			:disabled="disabled"
			:value="value"
			@change="onChange"
			@blur="onBlur"
		/>
	</FormItem>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { PropType } from 'vue';
import { Select, FormItem } from 'ant-design-vue';
import type { FormItemProps, SelectProps } from 'ant-design-vue';
import { type ConfigType } from "@/types/index";
export interface IConfig {
	defaultValue: string;
  formItem: FormItemProps,
	formWrap: SelectProps,
  source: Array<{label: string, value: string}>
}

const props = defineProps({
	id: { type: String },
	type: { type: String },
	value: { type: String },
	config: {type: Object as PropType<ConfigType<IConfig>>}
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

const onChange = (value: string) => {
  emits('change', value);
}

const onBlur = (value: string) => {
  emits('blur', value);
}

</script>

<style scoped>

</style>