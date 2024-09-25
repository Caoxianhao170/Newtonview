<template>
	<div class="comp-id">组件ID:{{selectedElement}}</div>
	<Form class="form-container">
		<div v-for="item in props.attrs">
      <div class="title" v-if="item.type === 'Title'">{{item.label}}</div>
      <FormItem v-else :label="item.label" :name="item.name">
				<Input
          v-if="item.type === 'Input'"
          :value="getFiledValue(item.name)"
          v-bind="{...item.props}"
					@change="e => onChange(e.target.value, item.name)"
				/>
        <Select
          v-else-if="item.type === 'Select'"
          :value="getFiledValue(item.name)"
          v-bind="{...item.props}"
          @change="e => onChange(e, item.name)"
        />
				<InputNumber
					v-else-if="item.type === 'InputNumber'"
					:value="getFiledValue(item.name)"
					v-bind="{...item.props}"
					@change="e => onChange(e, item.name)"
				/>
				<Switch
          v-else-if="item.type === 'Switch'"
          :checked="getFiledValue(item.name)"
          v-bind="{...item.props}"
          @change="e => onChange(e, item.name)"
				/>
				<component
					v-else-if="item.type === 'component'"
					:is="item.component"
				/>
      </FormItem>
		</div>
	</Form>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { usePageStore } from '@/store/usePageStore.ts';
import { Schema } from '@/components/CenterEditor/Schema.ts';
import { Form, FormItem, Input, Select, InputNumber, Switch } from 'ant-design-vue';

const props = defineProps({
	attrs: {
    type: Array,
		default: () => ([]),
	}
});

const emits = defineEmits(['change']);

// 页面的schema
const pageSchema = ref(Schema);

const pageState = usePageStore();
const { selectedElement } =storeToRefs(pageState);
const elementsMap = pageState.page.elementsMap;
const editElement = pageState.editElement;

const formData = ref({});
// 初始化表单域
const initFormFields = () => {
	formData.value = selectedElement ? elementsMap[selectedElement?.value]?.config?.props : pageSchema.value?.config.props;
};


// 监听选中元素变化时，初始化表单域
watch(selectedElement, initFormFields, { immediate: true });

// 更新表单值
const onChange = (value: any, name: string[]) => {
  console.log(value);
  if (Array.isArray(name)) {
    	if (name.length === 1 ) {
      formData.value[name[0]] = value;
    } else {
      formData.value[name[0]][name[1]] = value;
    }
	} else {
    formData.value[name] = value;
	}
  console.log(formData.value);
  editElement({
		id: selectedElement.value,
		type: 'props',
		props: formData.value,
	});
}

const getFiledValue = (name:string[]) => {
  if (Array.isArray(name)) {
    if (name.length === 1 ) {
      return formData.value ? formData.value[name[0]] : '';
		} else {
      return formData.value
				? formData.value[name[0]] ? formData.value[name[0]][name[1]] : ''
				: '';
		}
	} else {
    return formData.value ? formData.value[name] : '';
	}
}
</script>

<style scoped>
.comp-id {
	text-align: center;
	padding-bottom: 10px;
	border-bottom: 1px solid #f0f2f5;
}
.title {
	padding: 5px;
	margin-bottom: 10px;
	background: #f0f2f5;
	text-align: left;
}
</style>