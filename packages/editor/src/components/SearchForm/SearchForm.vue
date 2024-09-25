<template>
	<Form
		:form="useForm"
		ref="myForm"
		layout="inline"
		:style="props.config.style"
		:data-id="props.id"
		:data-type="props.type"
	>
    <!--表单项-->
    <div class="form-wrap" :style="isExpand ? {} : { height: 32, overflow: 'hidden'}">
			<NewtonRender
        orientation="horizontal"
				:id="props.id"
				:elements="props.elements"
				@change="handleValuesChange"
			/>
		</div>
    <!--按钮-->
    <Space align="baseline">
			<Button v-if="submitText" @click="handleSearch" type="primary">{{submitText}}</Button>
      <Button v-if="resetText" @click="handleReset">{{resetText}}</Button>
			<template v-if="bulkActionList?.length > 0">
				<Button
					v-for="(buttonItem, index) in bulkActionList"
					:key="index"
					:icon="buttonItem?.icon"
				>
					{{bulkActionList?.text}}
				</Button>
			</template>
		</Space>
	</Form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Form, Button, Space } from 'ant-design-vue';
import type { ButtonProps } from 'ant-design-vue';
import NewtonRender from '@/components/NewtonRender/index.vue'
import { usePageStore } from '@/store/usePageStore';
import { ComponentType } from "@/types/index.ts";

export interface IConfig {
	form: {
    submitText: string;
    resetText: string;
	};
  bulkActionList?: Array<ButtonProps> & { text: string; eventName: string; icon?: string };
}

// 属性
const props = defineProps<ComponentType<IConfig>>();

// 事件
const emits = defineEmits(['onChange', 'onSearch', 'onReset']);



// 页面状态
const pageState = usePageStore();
const { formData, elementsMap } = pageState.page;
const setFormData = pageState.setFormData;

// 表单实例
const useForm = Form.useForm;
const myForm = ref(null);

// 表单是否可见
const visible = ref(true);
const show = () => {
  visible.value = true;
}
const hide = () => {
  visible.value = false;
}

// 表单项展开收起
const isExpand = ref(false);
const changeExpand = (bool: boolean) => {
  isExpand.value = bool;
}

// 内部方法
const reset = () => {};
const submit = () => {};

const init = () => {};
const getFormData = () => {};

// 功能： 1.搜索 2.重置
const handleSearch = () => {
  console.log('onSearch');
  emits('onSearch', formData[props.id]);
};

// 重置
const handleReset = () => {
  emits('onReset', 'reset');
};

// 表单内容更新
const handleValuesChange = (value) => {
  console.log(value);
};


// 按钮相关处理
const config = props.config;
const { submitText,  resetText } = config.props.form;
const bulkActionList = config.props.bulkActionList;
</script>

<style scoped>
.form-wrap {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  row-gap: 18px;
  position: relative;
}
.slots {
	display: flex;
	width: 100%;
	background: #f0f2f5;
	align-items: center;
	border: 1px dashed #d9d9d9;
}
</style>